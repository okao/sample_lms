import React from "react";
import "./CustomButton.styles.scss";

const CustomButton = ({ children, onClick, wide, small, extra_small }) => {
  return (
    <button
      onClick={onClick}
      className={
        !small
          ? !wide
            ? !extra_small
              ? "custom-button"
              : "custom-button-small-extra"
            : "custom-button-wide"
          : "custom-button-small"
      }
    >
      {children}
    </button>
  );
};

export default CustomButton;
