import React, { useState } from "react";
import "./Modal.styles.scss";
// components
import CustomButton from "../custom-button/CustomButton.component";

const Modal = ({ children, toggleModal, modal }) => {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <CustomButton onClick={toggleModal} wide>
        ADD BORROWER
      </CustomButton>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
