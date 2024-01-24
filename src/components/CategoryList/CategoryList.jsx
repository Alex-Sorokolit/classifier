import React, { useState, useEffect } from "react";
// functions
import { getSubCategory, searchMaterials } from "../../services";
import { cutCpvCode, filterNextLevelItems } from "../../services";
// components
import Category from "../Category/Category";
import MaterialList from "../MaterialList/MaterialList";
import { List, Item } from "./CategoryList.styled";

const CategoryList = ({ items }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [filteredNextLevel, setFilteredNextLevel] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Запит по під категорії
  useEffect(() => {
    // console.log("selectedCode:", selectedCode);

    async function subCategory(selectedCode) {
      setIsLoading(true);
      try {
        const response = await getSubCategory(selectedCode);
        // console.log("response: ", response);
        setSubCategories(response.data);
      } catch (error) {
        setError("error");
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedCode) {
      subCategory(selectedCode);
    }
  }, [selectedCode]);

  // Запит по матеріали
  useEffect(() => {
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
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMaterial(selectedCode);
  }, [selectedCode]);

  // Фільтруємо елементи для наступної підкатегорії
  useEffect(() => {
    if (subCategories.length > 0) {
      const currentLevelItems = filterNextLevelItems(
        subCategories,
        selectedCode
      );
      setFilteredNextLevel(currentLevelItems.slice(1));
    }
  }, [subCategories, selectedCode]);

  // Функція формує cpv код і тоглить відкриття категорії
  const selectCategory = async (id, code) => {
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
        <p>Loading...</p>
      ) : (
        <List>
          {items.map((item) => (
            <Item key={item._id}>
              {selectedId === item._id ? (
                <Category
                  element={item}
                  selectCategory={() => selectCategory(item._id, item.Code)}
                >
                  {selectedCode.length > 4 ? (
                    <MaterialList materials={materials} />
                  ) : (
                    <CategoryList items={filteredNextLevel} />
                  )}
                </Category>
              ) : (
                <Category
                  element={item}
                  selectCategory={() => selectCategory(item._id, item.Code)}
                ></Category>
              )}
            </Item>
          ))}
        </List>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default CategoryList;
