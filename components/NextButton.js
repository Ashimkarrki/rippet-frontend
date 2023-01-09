import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import styles from "../styles/NextButton.module.css";
const NextButton = ({ className, style, onClick }) => {
  return (
    <button
      className={`${className} ${styles.icons}`}
      style={style}
      onClick={onClick}
    >
      <AiOutlineRight />
    </button>
  );
};

export default NextButton;
