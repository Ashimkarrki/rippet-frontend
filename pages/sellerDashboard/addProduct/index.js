import React, { useState } from "react";
import axios from "axios";
import styles from "../../../styles/AddProduct.module.css";
import IsAuth from "../../../utils/IsAuth";
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
          // console.log(files);
          console.log(files);
          formData.set("MainImage", files.MainImage);
          formData.set("Image1", files.Image1);
          formData.set("Image2", files.Image2);
          formData.set("Image3", files.Image3);
          Object.keys(data).map((s) => {
            formData.set(s, data[s]);
          });
          for (const value of formData.values()) {
            console.log(value);
          }
          // instance
          //   .post("/products", formData)
          //   .then((result) => {
          //     console.log(result);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

          // setData((prev) => {
          //   return {
          //     ...prev,
          //   };
          // });
        }}
      >
        <div>
          <h4 className={styles.heading}>Name </h4>
          <input
            className={styles.input}
            type="text"
            name="Name"
            value={data.Name}
            required
            onChange={onChangeState}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Price </h4>
          <input
            className={styles.input}
            type="number"
            name="Price"
            value={data.Price}
            required
            onChange={onChangeState}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Stock </h4>
          <input
            className={styles.input}
            type="number"
            name="Stock"
            value={data.Stock}
            required
            onChange={onChangeState}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Discount </h4>
          <input
            className={styles.input}
            type="number"
            name="Discount"
            value={data.Discount}
            required
            onChange={onChangeState}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Tags </h4>
          <input
            className={styles.input}
            type="text"
            name="SearchItem"
            onChange={onChangeState}
            required
            value={data.SearchItem}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Category</h4>
          <select
            className={styles.input}
            name="Category"
            required
            onChange={onChangeState}
            value={data.Category}
            // className={styles.select}
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
        </div>
        <div>
          <h4 className={styles.heading}>Main Image</h4>
          <input
            // value={files.MainImage}
            // className={styles.input}
            type="file"
            name="MainImage"
            required
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
        </div>
        <div>
          <h4 className={styles.heading}>SideImage1</h4>
          <input
            // value={files.Image1}
            // className={styles.input}
            type="file"
            name="Image1"
            required
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
        </div>
        <div>
          <h4 className={styles.heading}>SideImage2</h4>
          <input
            // className={styles.input}
            // value={files.Image2}
            type="file"
            name="Image2"
            required
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
        </div>
        <div>
          <h4 className={styles.heading}>SideImage3</h4>
          <input
            // value={files.Image3}
            // className={styles.input}
            type="file"
            name="Image3"
            required
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Description</h4>
          <textarea
            name="Description"
            className={`${styles.input} ${styles.text_area}`}
            value={data.Description}
            onChange={onChangeState}
            rows={6}
          />
        </div>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default IsAuth(AddProduct);
