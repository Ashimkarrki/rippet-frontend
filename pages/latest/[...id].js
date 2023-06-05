import React from "react";
import Pagination from "../../components/Pagination";

const Latest = ({ data }) => {
  return (
    <div style={{ width: "82%", margin: "2rem auto" }}>
      <Pagination data={data} from="Latest" />
    </div>
  );
};
export const getServerSideProps = async (context) => {
  console.log(context.params.id);
  const res = await fetch(
    "https://expensive-cod-handkerchief.cyclic.app/api/v1/products/latestProduct/product/all/" +
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
export default Latest;
