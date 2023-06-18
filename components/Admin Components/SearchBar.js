import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/substyle/SearchBar.module.css";
const SearchBar = ({ who, term }) => {
  const router = useRouter();
  const [value, setValue] = useState(term);
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/adminDashboard/" + who + "/search/" + value);
      }}
    >
      <input
        className={styles.input}
        type="text"
        placeholder={"Search " + who}
        required
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(e.target.value);
        }}
      />
      <input className={styles.btn} type="submit" value="Search" />
    </form>
  );
};

export default SearchBar;
