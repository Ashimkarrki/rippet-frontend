import React from "react";
import styles from "../../styles/SearchPage.module.css";
import IsAuth from "../../utils/IsAuth";
import Pagination from "../../components/Pagination";
const SearchPage = ({ data }) => {
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
  if (!data.totalpages) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
};
export default IsAuth(SearchPage);
