import React, { useState, useEffect, useRef } from "react";
// functions
import { getSubCategory, searchMaterials } from "../../services";
import {
  cutCpvCode,
  filterNextLevelItems,
  createLevel,
  scrollTo,
} from "../../services";
// components
import Category from "../Category/Category";
import MaterialList from "../MaterialList/MaterialList";
import { List, Item } from "./CategoryList.styled";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const CategoryList = ({ items, query }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedCode, setSelectedCode] = useState("");
  const [filteredNextLevel, setFilteredNextLevel] = useState([]);
  const [level, setLevel] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const categoryRef = useRef();

  // Запит по під категорії
  useEffect(() => {
    // console.log("get subcategory effect");
    const controller = new AbortController();
    async function subCategory(selectedCode) {
      // console.log("selectedCode:", selectedCode);
      setIsLoading(true);
      // console.log("setIsLoading:  true");
      try {
        const response = await getSubCategory(selectedCode, controller.signal);
        // console.log("response: ", response);
        setSubCategories(response.data);
      } catch (error) {
        toast.error("Не вдалось завантажити підкагеторії");
      } finally {
        // console.log("setIsLoading:  false");
        setIsLoading(false);
      }
    }

    if (selectedCode.length > 0 && selectedCode.length < 5) {
      // console.log("selectedCode: ", selectedCode);
      // console.log("get sub categorys");
      subCategory(selectedCode);
    }

    return () => {
      // console.log("abort");
      controller.abort();
    };
  }, [selectedCode]);

  // Запит по матеріали
  useEffect(() => {
    // console.log("effect material");
    async function getMaterial(selectedCode) {
      setIsLoading(true);
      try {
        const response = await searchMaterials(selectedCode);
        // console.log("materials", response.data);

        if (response.data.length < 1) {
          return;
        } else {
          setMaterials(response.data.slice(1));
        }
      } catch (error) {
        toast.error("Не вдалось завантажити матеріали");
      } finally {
        // console.log("setIsLoading:  false");
        setIsLoading(false);
      }
    }

    if (selectedCode.length >= 5) {
      // console.log("get materials");
      getMaterial(selectedCode);
    }
  }, [selectedCode]);

  // Фільтруємо елементи для наступної підкатегорії
  useEffect(() => {
    // console.log(subCategories);
    if (subCategories.length > 0) {
      // console.log("effect filter");
      const currentLevelItems = filterNextLevelItems(
        subCategories,
        selectedCode
      );
      // console.log("currentLevelItems", currentLevelItems);
      setFilteredNextLevel(currentLevelItems.slice(1));
    }
  }, [subCategories, selectedCode]);

  useEffect(() => {
    if (items.length > 0) {
      const cutedCpvCode = cutCpvCode(items[0].Code);
      setLevel(createLevel(cutedCpvCode));
    }
  }, [items, selectedCode]);

  // Функція формує cpv код і тоглить відкриття категорії
  const selectCategory = async (id, code, event) => {
    // console.log("select", event);
    // console.log("set code to state");
    scrollTo(categoryRef, event);

    setSelectedCode(cutCpvCode(code));
    toggleCategory(id);
  };

  // Відкриття-закриття категорії
  function toggleCategory(id) {
    if (selectedId === id) {
      // console.log("selectedId: ", selectedId, "=", id);
      setSelectedId(null);
    } else {
      // console.log("selectedId: ", selectedId, "!=", id);
      setSelectedId(id);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <List level={level}>
          {items.map((item) => (
            <Item key={item._id}>
              {/* якщо вибраний елемент */}
              {selectedId === item._id ? (
                <Category
                  element={item}
                  selectCategory={() => selectCategory(item._id, item.Code)}
                  query={query}
                >
                  {/* якщо код довший то це матеріали */}
                  {selectedCode.length > 4 ? (
                    <MaterialList materials={materials} query={query} />
                  ) : (
                    <CategoryList items={filteredNextLevel} query={query} />
                  )}
                </Category>
              ) : (
                <Category
                  ref={categoryRef}
                  element={item}
                  selectCategory={(event) =>
                    selectCategory(item._id, item.Code, event)
                  }
                  query={query}
                ></Category>
              )}
            </Item>
          ))}
        </List>
      )}
    </>
  );
};

export default CategoryList;
