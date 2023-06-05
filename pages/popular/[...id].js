import React from "react";
import Pagination from "../../components/Pagination";
import IsAuth from "../../utils/IsAuth";
const Popular = ({ data }) => {
  return (
    <div style={{ width: "82%", margin: "2rem auto" }}>
      <Pagination data={data} from="Popular" />
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const res = await fetch(
    "https://expensive-cod-handkerchief.cyclic.app/api/v1/products/rated/product/all/" +
      context.params.id[0] || 1
  );
  const data = await res.json();
  if (!data.totalPages) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
};
export default IsAuth(Popular);
