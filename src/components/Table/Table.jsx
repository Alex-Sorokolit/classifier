import React, { useEffect, useState } from "react";
import Category from "../Category/Category";
import Row from "../Row/Row";
import css from "./Table.module.css";
import { getCategory, getSubCategory } from "../../services/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    // створюємо асинхронну функцію
    async function getAllCategory() {
      setIsLoading(true);
      try {
        const response = await getCategory();
        setData(response.data);
      } catch {
        setError("error");
      } finally {
        setIsLoading(false);
      }
    }
    // викликаємо функцію
    getAllCategory();
  }, []);

  const selectCategory = async (id, code) => {
    // console.log("id: ", id);
    const cpvCode = [];

    for (let index = 0; index < code.length; index++) {
      if (code[index] === "0") {
        break;
      } else {
        cpvCode.push(code[index]);
        // console.log(code[index]);
      }
    }

    // console.log("cpvCode: ", cpvCode);
    const stringCpvCode = cpvCode.join("");
    // console.log("stringCpvCode: ", stringCpvCode);

    // Відкриття-закриття основної категорії
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }

    setIsLoading(true);
    try {
      const response = await getSubCategory(stringCpvCode);
      setSubCategory(response.data);
    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={css.table}>
          <li>
            {data.map((element) => (
              <div key={element._id} className={css.row}>
                <Category
                  element={element}
                  selectCategory={() =>
                    selectCategory(element._id, element.Code)
                  }
                  isSelected={element._id === selectedId}
                  subCategory={subCategory}
                />
              </div>
            ))}
          </li>
        </ul>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default Table;
