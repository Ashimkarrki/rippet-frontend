import React from "react";

const SearchPage = ({ data }) => {
  console.log(data);
  return <div>SearchPage</div>;
};
// {{URL}}api/v1/products/search/ashim/1

export const getServerSideProps = async (context) => {
  console.log(context.params.id);
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/search/" +
      context.params.id[0] +
      "/" +
      context.params.id?.at(1) || 1
  );
  const data = await res.json();
  return {
    props: data,
  };
};
export default SearchPage;
