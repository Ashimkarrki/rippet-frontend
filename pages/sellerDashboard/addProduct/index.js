import React, { useState } from "react";
import axios from "axios";
import styles from "../../../styles/AddProduct.module.css";
const AddProduct = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const [data, setData] = useState({
    Name: "",
    Price: "",
    Stock: "",
    Discount: "",
    SearchItem: "",
    Category: "",
    Description: "",
  });
  console.log(Object.keys(data));
  const [files, setFiles] = useState({
    MainImage: "",
    Image1: "",
    Image2: "",
    Image3: "",
  });

  const onChangeState = (e) => {
    console.log(data.MainImage);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onFileChange = (e) => {
    // console.log(URL.createObjectURL(e.target.files[0]));
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };
  return (
    <div className={styles.add_product_wrapper}>
      <form
        className={styles.add_product}
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData();
          console.log(files);
          formData.set("MainImage", files.MainImage);
          formData.set("Images", [files.Image1, files.Image2, files.Image3]);
          Object.keys(data).map((s) => {
            formData.set(s, data[s]);
          });
          console.log(formData);
          instance
            .post("/products", formData)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });

          setData((prev) => {
            return {
              ...prev,
            };
          });
        }}
      >
        Name:{" "}
        <input
          type="text"
          name="Name"
          value={data.Name}
          required
          onChange={onChangeState}
        />
        Price :{" "}
        <input
          type="number"
          name="Price"
          value={data.Price}
          required
          onChange={onChangeState}
        />
        Stock :
        <input
          type="number"
          name="Stock"
          value={data.Stock}
          required
          onChange={onChangeState}
        />
        Discount :
        <input
          type="number"
          name="Discount"
          value={data.Discount}
          required
          onChange={onChangeState}
        />
        Tags :
        <input
          type="text"
          name="SearchItem"
          onChange={onChangeState}
          required
          value={data.SearchItem}
        />
        Category :
        <select
          name="Category"
          required
          onChange={onChangeState}
          value={data.Category}
        >
          <option value={""}>-Select An Option- </option>
          <option value={"New Books"}>New Books</option>

          <option value={"Notebooks"}>Notebooks</option>
          <option value={"Drawing Instruments"}>Drawing Instruments</option>
          <option value={"Books For Rent"}>Books For Rent</option>
          <option value={"Question Banks"}>Question Banks</option>
          <option value={"Extra Prdoucts / Gifts"}>
            Extra Prdoucts / Gifts
          </option>
        </select>
        Main Image :
        <input
          // value={files.MainImage}
          type="file"
          name="MainImage"
          required
          accept="image/png, image/jpeg"
          onChange={onFileChange}
        />
        SideImage1 :
        <input
          // value={files.Image1}
          type="file"
          name="Image1"
          required
          accept="image/png, image/jpeg"
          onChange={onFileChange}
        />
        SideImage2 :
        <input
          // value={files.Image2}
          type="file"
          name="Image2"
          required
          accept="image/png, image/jpeg"
          onChange={onFileChange}
        />
        SideImage3 :
        <input
          // value={files.Image3}
          type="file"
          name="Image3"
          required
          accept="image/png, image/jpeg"
          onChange={onFileChange}
        />
        Description :
        <textarea
          name="Description"
          value={data.Description}
          onChange={onChangeState}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
