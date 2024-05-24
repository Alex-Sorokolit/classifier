import React, { useState, useEffect, useMemo } from "react";

// functions
import {
  addMaterial,
  updateMaterial,
  getByParentId,
  removeMaterial,
} from "../../services";
import { createLevel } from "../../services";
// components
import Category from "../Category/Category";
import { List, Item } from "./MaterialList.styled";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { Button } from "../Button/Button";
import Confirm from "../Confirm/Confirm";
import AddMaterialForm from "../AddMaterialForm/AddMaterialForm";
import EditMaterialForm from "../EditMaterialForm/EditMaterialForm";

const MaterialList = ({ items, query }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [newMaterial, setNewMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [curentItems, setCurrentItems] = useState(items);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Запит по під категорії
  useEffect(() => {
    const controller = new AbortController();
    async function subCategory(selectedId) {
      // console.log("get subcategory effect");
      setIsLoading(true);
      try {
        const response = await getByParentId(selectedId, controller.signal);
        setSubCategories(response.data);
      } catch (error) {
        toast.error("Не вдалось завантажити підкагеторії");
      } finally {
        setIsLoading(false);
      }
    }

    if (!selectedId) {
      return;
    }
    subCategory(selectedId);

    return () => {
      controller.abort();
    };
  }, [selectedId, newMaterial, setSubCategories]);

  // Створення класів для кольорів
  const level = useMemo(() => {
    if (items.length > 0) {
      return createLevel(items[0].ElementNestingLevel);
    }
    return null;
  }, [items]);

  // Функція  тоглить відкриття категорії
  const selectCategory = async (event, id) => {
    if (event.target.tagName !== "path" && event.target.tagName !== "svg") {
      toggleCategory(id);
    }
  };

  // Відкриття-закриття категорії
  function toggleCategory(id) {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  // Створення матеріалу
  function createMaterial(material) {
    const controller = new AbortController();
    async function createMaterial(newMaterial) {
      try {
        const response = await addMaterial(newMaterial, controller.signal);
        toast.success("Матеріал успішно створено");
        setNewMaterial(response.data);
      } catch (error) {
        toast.error("Не вдалось створити матеріал");
      }
    }
    createMaterial(material);
    return () => {
      controller.abort();
    };
  }

  // Редагування матеріалу
  function editMaterial(id, editedMaterial) {
    const controller = new AbortController();
    async function edit(id, editedMaterial) {
      try {
        const response = await updateMaterial(
          id,
          editedMaterial,
          controller.signal
        );
        // Видаляємо оновлений матеріал із списку, якщо в оновленого матеріалу ParentElementId відрізняється від елементів у поточному списку
        if (response.data.ParentElementId !== curentItems[0].ParentElementId) {
          setCurrentItems(
            curentItems.filter((item) => item._id !== response.data._id)
          );
        } else {
          // Замінюємо матеріал на оновлений
          setCurrentItems(
            curentItems.map((item) => {
              if (item._id === id) {
                return {
                  ...response.data,
                };
              }
              return item;
            })
          );
        }

        // console.log("response.data: ", response.data);
        toast.success("Матеріал успішно оновлено");
      } catch (error) {
        toast.error("Не вдалось оновити матеріал");
      }
    }
    edit(id, editedMaterial);
    return () => {
      controller.abort();
    };
  }
  // Відкриття меню підтвердження
  const confirmDelete = (id) => {
    setConfirmOpen(id);
  };

  // Тогл меню підтвердження
  const toggleConfirm = () => {
    setConfirmOpen(!confirmOpen);
  };

  // Видалення матеріалу
  async function handleDelete(id) {
    try {
      const result = await removeMaterial(id);
      if (result) {
        toast.info("Матеріал успішно видалений");
        setCurrentItems(
          curentItems.filter(
            (category) => category._id !== result.data.material._id
          )
        );
        setConfirmOpen(false);
      }
    } catch (error) {
      toast.error("Не вдалось видалити  матеріал");
    } finally {
    }
  }

  return (
    <>
      <div>
        <List level={level}>
          {curentItems.map((item) => (
            <Item key={item._id}>
              {/* якщо вибраний елемент */}
              {selectedId === item._id ? (
                <Category
                  element={item}
                  selectCategory={(event) => selectCategory(event, item._id)}
                  query={query}
                  isSelected={selectedId === item._id}
                  handleDelete={confirmDelete}
                  addForm={AddMaterialForm}
                  editForm={EditMaterialForm}
                  create={createMaterial}
                  edit={editMaterial}
                  isdelete={item._id === confirmOpen ? item._id : undefined}
                >
                  {isLoading ? (
                    <BarLoader color="#125b56" width="100%" />
                  ) : (
                    <MaterialList items={subCategories} query={query} />
                  )}
                </Category>
              ) : (
                <Category
                  element={item}
                  selectCategory={(event) => selectCategory(event, item._id)}
                  query={query}
                  handleDelete={confirmDelete}
                  addForm={AddMaterialForm}
                  editForm={EditMaterialForm}
                  create={createMaterial}
                  edit={editMaterial}
                  isdelete={item._id === confirmOpen ? item._id : undefined}
                ></Category>
              )}
            </Item>
          ))}
        </List>
      </div>
      {confirmOpen && (
        <Confirm onClose={toggleConfirm} title="Ви точно хочете видалити?">
          <>
            <Button onClick={() => handleDelete(confirmOpen)} role="warning">
              Delete
            </Button>
            <Button onClick={toggleConfirm}>Cancel</Button>
          </>
        </Confirm>
      )}
    </>
  );
};

export default MaterialList;
