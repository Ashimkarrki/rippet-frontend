import Banner from "../components/Banner";
import axios from "axios";
import styles from "../styles/Home.module.css";
import CarouselComponent from "../components/CarouselComponent";
import Services from "../components/Services";
import Category from "../components/Category";
import useFetchUser from "../features/fetchUser";
import SellerHomecomponenet from "../components/SellerHomeComponenet";
export default function Home({ data }) {
  useFetchUser();
  const category = [
    {
      id: 0,
      name: "New Books ",
      pic: "https://img.freepik.com/premium-vector/heap-books-sketch-library-stack-education-symbol_80590-12797.jpg?w=2000",
    },
    {
      id: 1,
      name: "Notebooks",
      pic: "https://cdn.shopify.com/s/files/1/0472/7118/2499/products/10080576a.jpg?v=1632404617",
    },
    {
      id: 2,
      name: "Drawing Instruments",
      pic: "https://i0.wp.com/theconstructor.org/wp-content/uploads/2017/12/instruments-used-in-engineering-drawings.jpg?fit=614%2C374&ssl=1",
    },

    {
      id: 4,
      name: "Books For Rent",
      pic: "https://pbs.twimg.com/profile_images/418448622435303424/-RohWP8q_400x400.png",
    },
    {
      id: 5,
      name: "Question Banks",
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXN_OnesjDHq1QME_dOt5aJnRqkbhL9llsBQ&usqp=CAU",
    },
    {
      id: 6,
      name: "Extra Prdoucts / Gifts",
      pic: "https://static-01.daraz.com.np/p/af9329c672b648e203195279ab20e0e0.jpg",
    },
  ];
  const lists = data.data?.products;
  const list1 = lists?.filter((s, i) => {
    return i < data.results / 2;
  });
  const list2 = lists?.filter((s, i) => {
    return i >= data.results / 2;
  });
  console.log("///");
  console.log(list1);
  console.log(list2);
  axios.defaults.baseURL =
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/";

  axios.defaults.withCredentials = true;
  return (
    <>
      <div className={styles.home}>
        <Banner />
        <CarouselComponent list={list1} title={"Latest Products"} />
        <CarouselComponent list={list2} title={"Popular Products"} />
        <Category list={category} />
        <CarouselComponent list={list1} title={"Most Rated Products"} />
        <Services />
      </div>
      <SellerHomecomponenet />
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products"
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
