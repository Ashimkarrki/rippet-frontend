import React from "react";
import Link from "next/link";
import styles from "../../styles/substyle/PageNumber.module.css";
const PageNumber = ({ current, total, url }) => {
  const repeat = (time) => {
    let array = [];
    for (let i = 1; i <= time; i++) {
      array.push(
        <button
          className={`${styles.button} ${
            Number(current) === i && styles.active
          } ${i === 1 && styles.button_start} ${
            i === time && styles.button_end
          }`}
        >
          {i}
        </button>
      );
    }
    return array;
  };
  if (total !== 1) {
    return (
      <div className={styles.button_grp}>
        {repeat(total).map((s, index) => {
          return (
            <Link href={url + Number(index + 1)} key={index}>
              {s}
            </Link>
          );
        })}
      </div>
    );
  }
  return <div></div>;
};

export default PageNumber;
