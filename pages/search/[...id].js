import React from "react";
import styles from "../../styles/SearchPage.module.css";
import IsAuth from "../../utils/IsAuth";
import { BiError } from "react-icons/bi";
import Pagination from "../../components/Pagination";
const SearchPage = ({ success, data }) => {
  if (!success) {
    return (
      <div className={styles.notFound}>
        <p>Sorry , Product Currenty Not Available</p>
        <BiError className={styles.icons} />
      </div>
    );
  }
  return (
    <div className={styles.search_wrapper}>
      <Pagination data={data} from={"search"} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    "https://rappitnepal.cyclic.app/api/v1/products/search/" +
      context.params.id[0] +
      "/" +
      context.params.id[1] +
      "/" +
      context.params.id[2] +
      "/" +
      context.params.id[3]
  );
  const data = await res.json();
  console.log(data);
  if (!data.totalpages) {
    return {
      props: {
        success: false,
      },
    };
  }
  return {
    props: {
      success: true,
      data: data,
    },
  };
};
export default IsAuth(SearchPage);
