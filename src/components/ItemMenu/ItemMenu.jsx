import React, { useContext } from "react";
import { authContext as context } from "../../context/authContext";
import { IconButton } from "../Button/Button";
import { MdModeEditOutline } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoIosCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const ItemMenu = ({ id, toggleAddForm, toggleEditeForm, handleDelete }) => {
  const { role } = useContext(context);
  if (role === "admin") {
    return (
      <>
        <CopyToClipboard
          text={id}
          onCopy={() => toast.info(`Код ${id} скопійовано в буфер омбіну`)}
        >
          <IconButton
            id="copyId"
            icon={IoIosCopy}
            visibility="visible"
            variant="neutral"
            tooltip="Копіювати id"
          ></IconButton>
        </CopyToClipboard>

        <IconButton
          id="add"
          icon={FaSquarePlus}
          visibility="visible"
          variant="neutral"
          tooltip="Додати"
          onClick={() => toggleAddForm(id)}
        ></IconButton>
        <IconButton
          icon={MdModeEditOutline}
          visibility="visible"
          variant="neutral"
          tooltip="Редагувати"
          onClick={() => toggleEditeForm(id)}
        ></IconButton>
        <IconButton
          icon={MdDelete}
          visibility="visible"
          variant="neutral"
          tooltip="Видалити"
          onClick={() => handleDelete(id)}
        ></IconButton>
      </>
    );
  }
  if (role === "designer") {
    return (
      <>
        <IconButton
          icon={MdModeEditOutline}
          visibility="visible"
          variant="neutral"
          tooltip="Редагувати"
          onClick={() => toggleEditeForm(id)}
        ></IconButton>
        <IconButton
          icon={MdDelete}
          visibility="visible"
          variant="neutral"
          tooltip="Видалити"
          onClick={() => handleDelete(id)}
        ></IconButton>
      </>
    );
  }
};

export default ItemMenu;
