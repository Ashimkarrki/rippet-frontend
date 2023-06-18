import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import positionStyles from "../../../../styles/substyle/AdminDashboardContainer.module.css";
import axios from "axios";
import Loading from "../../../../components/Loading";
import UserTable from "../../../../components/Admin Components/UserTable";
import SearchBar from "../../../../components/Admin Components/SearchBar";
const Search = () => {
  const router = useRouter();
  console.log(router?.query?.id);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(
    router?.query?.id ? `/admin/userSearch/${router.query.id}` : null,
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
      <SearchBar who={"user"} term={data.searchTerm} />
      {data.user.length === 0 ? (
        <h1>No Results</h1>
      ) : (
        <UserTable data={data.user} />
      )}
    </div>
  );
};

export default Search;
