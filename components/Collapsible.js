import React, { useState } from "react";
import styles from "../styles/Collapsible.module.css";
import { BsChevronUp, BsChevronDown, BsDot } from "react-icons/bs";
const Collapsible = ({ child, clicked }) => {
  const [parentClicked, setParentClicked] = useState(
    child.map((s) => {
      return {
        id: s._id,
        state: false,
      };
    })
  );
  if (child.length === 0) {
    return;
  }
  return (
    <ul className={!clicked ? styles.no_show : styles.show}>
      {child.map((s) => {
        return (
          <li key={s._id} className={styles.li}>
            <p
              className={styles.heading}
              onClick={() =>
                setParentClicked((prev) => {
                  return prev.map((k) => {
                    if (k.id === s._id) {
                      return { ...k, state: !k.state };
                    }
                    return {
                      ...k,
                      state: false,
                    };
                  });
                })
              }
            >
              {parentClicked.find((k) => k.id === s._id).state ? (
                <BsChevronDown className={styles.icon_cat} />
              ) : (
                <BsDot className={styles.icon_cat} />
              )}
              {s.title}
            </p>
            <Collapsible
              child={s.children}
              title={s.title}
              clicked={parentClicked.find((k) => k.id === s._id).state}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Collapsible;
