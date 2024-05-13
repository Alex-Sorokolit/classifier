import React, { useState, useEffect, useContext } from "react";
import AddForm from "../AddForm/AddForm";
import { authContext as context } from "../../context/authContext";
import { createLevel } from "../../services";
import { toast } from "react-toastify";
import { IconButton } from "../Button/Button";
import { IoIosCopy } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { hiLight } from "../../services";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CategoryWrapper,
  CategoryCode,
  CategoryDescription,
  HilightDescription,
  CodeWrapper,
  DescriptionWrapper,
  MaterialPrice,
  MaterialUnit,
  Extended,
  SubList,
  Card,
  ItemMenu,
} from "./Category.styled";

// Компонент рендерить розмітку категорії і вкладені списки
const Category = ({
  element: {
    _id,
    ParentElementId,
    Code,
    DescriptionUA,
    PriceUAH,
    Unit,
    ElementNestingLevel,
  },
  selectCategory,
  children,
  query,
  isSelected,
  handleDelete,
  createMaterial,
}) => {
  const [level, setLevel] = useState(null);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const { role } = useContext(context);

  useEffect(() => {
    setLevel(createLevel(ElementNestingLevel));
  }, [ElementNestingLevel]);

  function handleClick(event) {
    selectCategory(event);
  }

  // Відкриття-закриття форми додавання
  function toggleAddForm(id) {
    if (addFormVisible === id) {
      setAddFormVisible(null);
    } else {
      setAddFormVisible(id);
      setEditForm(false);
    }
  }
  // Відкриття-закриття форми редагування
  function toggleEditeForm(id) {
    console.log("edit");
    if (addFormVisible === id) {
      setAddFormVisible(null);
      setEditForm(false);
    } else {
      setAddFormVisible(id);
      setEditForm(true);
    }
  }

  // Закриття форми
  function closeForm() {
    setAddFormVisible(null);
  }

  return (
    <>
      <Card onClick={handleClick}>
        <CategoryWrapper level={level}>
          <CodeWrapper level={level}>
            <CopyToClipboard
              text={Code}
              onCopy={() =>
                toast.info(`Код ${Code} скопійовано в буфер омбіну`)
              }
            >
              <IconButton
                icon={IoIosCopy}
                visibility="hide"
                position="absolute"
                variant="light"
                tooltip="Копіювати"
              ></IconButton>
            </CopyToClipboard>
            <CategoryCode>{Code}</CategoryCode>
          </CodeWrapper>

          <DescriptionWrapper>
            {query ? (
              <div>
                <HilightDescription>
                  {hiLight(query, DescriptionUA)}
                </HilightDescription>
                <CopyToClipboard
                  text={DescriptionUA}
                  onCopy={() =>
                    toast.info(`${DescriptionUA} скопійовано в буфер омбіну`)
                  }
                >
                  <IconButton
                    icon={IoIosCopy}
                    visibility="hide"
                    position="absolute"
                    variant="dark"
                    tooltip="Копіювати"
                  ></IconButton>
                </CopyToClipboard>
              </div>
            ) : (
              <div>
                <CopyToClipboard
                  text={DescriptionUA}
                  onCopy={() =>
                    toast.info(`${DescriptionUA} скопійовано в буфер омбіну`)
                  }
                >
                  <IconButton
                    icon={IoIosCopy}
                    visibility="hide"
                    position="absolute"
                    variant="dark"
                    tooltip="Копіювати"
                  ></IconButton>
                </CopyToClipboard>
                <CategoryDescription>{DescriptionUA}</CategoryDescription>
              </div>
            )}
            <Extended>
              {Unit && <MaterialUnit>Одиниця виміру: {Unit} </MaterialUnit>}
              {PriceUAH && (
                <MaterialPrice>Ціна: {PriceUAH} &#8372;</MaterialPrice>
              )}
            </Extended>
          </DescriptionWrapper>
        </CategoryWrapper>
        {role === "admin" && (
          <ItemMenu>
            <IconButton
              id="add"
              icon={FaSquarePlus}
              visibility="visible"
              variant="neutral"
              tooltip="Додати"
              onClick={() => toggleAddForm(_id)}
            ></IconButton>
            <IconButton
              icon={MdModeEditOutline}
              visibility="visible"
              variant="neutral"
              tooltip="Редагувати"
              onClick={() => toggleEditeForm(_id)}
            ></IconButton>
            <IconButton
              icon={MdDelete}
              visibility="visible"
              variant="neutral"
              tooltip="Видалити"
              onClick={() => handleDelete(_id)}
            ></IconButton>
          </ItemMenu>
        )}
      </Card>

      {addFormVisible && (
        <AddForm
          id={_id}
          Code={Code}
          ParentElementId={ParentElementId}
          onClose={() => closeForm()}
          createMaterial={createMaterial}
          isEdit={editForm}
        ></AddForm>
      )}
      {isSelected && <SubList>{children}</SubList>}
    </>
  );
};

export default Category;
