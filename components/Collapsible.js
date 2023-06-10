import React, { useState } from "react";
import styles from "../styles/Collapsible.module.css";
import { BsChevronUp, BsChevronDown, BsDot } from "react-icons/bs";
import Link from "next/link";
const Collapsible = ({ child, clicked, setIsMenuOn }) => {
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
      {child?.map((s) => {
        return (
          <li key={s._id} className={styles.li}>
            {s?.categoriesName ? (
              <Link
                href={"/categories/" + s.categoriesName + "/no/no/1"}
                // onClick={() => setIsMenuOn(false)}
              >
                <p
                  className={styles.heading}
                  onClick={() => {
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
                    });
                  }}
                >
                  {parentClicked.find((k) => k.id === s._id).state &&
                  s.children.length !== 0 ? (
                    <BsChevronDown className={styles.icon_cat} />
                  ) : (
                    <BsDot className={styles.icon_cat} />
                  )}
                  {s.title}
                </p>
              </Link>
            ) : (
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
                {parentClicked.find((k) => k.id === s._id).state &&
                s.children.length !== 0 ? (
                  <BsChevronDown className={styles.icon_cat} />
                ) : (
                  <BsDot className={styles.icon_cat} />
                )}
                {s.title}
              </p>
            )}
            {/* <p
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
              {parentClicked.find((k) => k.id === s._id).state &&
              s.children.length !== 0 ? (
                <BsChevronDown className={styles.icon_cat} />
              ) : (
                <BsDot className={styles.icon_cat} />
              )}
              {s.title}
            </p> */}
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
