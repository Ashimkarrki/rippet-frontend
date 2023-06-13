import React from "react";
import styles from "../../styles/substyle/Button.module.css";
const Button = (children) => {
  return (
    <button
      className={`${children.className} ${styles.button}`}
      onClick={children.onClick}
      style={{
        marginTop: children.marginTop,
        marginLeft: children.marginLeft,
        marginBottom: children.marginBottom,
        marginRight: children.marginRight,
      }}
    >
      {children.content}
    </button>
  );
};

export default Button;
