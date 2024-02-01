import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Content } from "./Modal.styled";

// корінь
const modalRoot = document.querySelector("#modal-root");

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      // console.log(e.code);
      if (e.code === "Escape") {
        // console.log("Escape pressed, close modal");
        onClose();
      }
    }
    // console.log("modal component did mount");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // console.log("modal component will unmount");
      // console.log("remove eventlisener");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleBackDropClick(event) {
    // console.log(event.target);
    // console.log(event.currentTarget);
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <Backdrop onClick={handleBackDropClick}>
      <Content>{children}</Content>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;