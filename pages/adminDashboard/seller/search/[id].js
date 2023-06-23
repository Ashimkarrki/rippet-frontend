import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../../../styles/Search.module.css";
import positionStyles from "../../../../styles/substyle/DashboardContainer.module.css";
import Loading from "../../../../components/Loading";
import SellerTable from "../../../../components/Admin Components/SellerTable";
import SearchBar from "../../../../components/Admin Components/SearchBar";

const Search = () => {
  const router = useRouter();
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading, mutate } = useSWR(
    router?.query?.id ? `/admin/sellerSearch/${router.query.id}` : null,
    async (url) => {
      try {
        const res = await instance.get(url);
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  if (!data || isLoading) {
    return <Loading />;
  }
  return (
    <div className={positionStyles.container}>
      <SearchBar who="seller" term={data.searchTerm} />
      {data.seller.length === 0 ? (
        <h1>No Results</h1>
      ) : (
        <SellerTable mutate={mutate} data={data.seller} all={data} />
      )}
    </div>
  );
};

export default Search;
