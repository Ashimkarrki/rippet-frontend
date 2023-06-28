import React, { useState, useRef } from "react";
import useSWR, { mutate } from "swr";

import axios from "axios";
const CategoriesController = () => {
  const ref = useRef();
  const [selectValue, setSelectValue] = useState("");

  const [track, setTrack] = useState([]);
  const [child, setChild] = useState([]);
  const [isNewCat, setIsNewCat] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    check: false,
  });
  const { data, isLoading, error } = useSWR(
    "/categories",
    async (url) => {
      try {
        const res = await axios.get(url);
        console.log(res.data);
        setChild(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const formChange = (e) => {
    if (e.target.name === "check") {
      setFormData({
        ...formData,
        check: !formData.check,
      });
      return;
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(formData);
  const submitHandeler = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(track[track.length - 1]);
    let postData = {
      title: formData.name,
      parent: track?.at(track?.length - 1)?.id,
      categoriesName: formData.check
        ? track?.map((s) => s.title)?.join("-")
          ? track?.map((s) => s.title)?.join("-") + "-"
          : "" + formData.name
        : null,
    };
    try {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      const res = await instance.post("/categories", {
        ...postData,
      });
      mutate(res.data);
      setChild(res.data);
      setFormData({});
      setIsNewCat(false);
      setTrack([]);
      setSelectValue("select");
    } catch (err) {
      console.log(err);
    }
    console.log(postData);
  };

  const clickhandeler = (e, index) => {
    let arr = data;
    for (let i = 0; i < index; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].title === track[i].title) {
          arr = arr[j].children;
        }
      }
    }
    setIsNewCat(false);
    setFormData({});
    setChild(arr);
    setTrack(track.filter((s, i) => i < index));
  };
  const changeHandeler = async (e) => {
    const val = e.target.value;
    setSelectValue(val);
    if (val === "select") {
      return;
    }
    if (val === "addNew") {
      setIsNewCat(true);
      return;
    }
    if (val === "delete") {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.delete(
          "/categories/" + track[track.length - 1].id
        );
        console.log(res.data);
        mutate(res.data.remainingCategories);
        setTrack([]);
        setChild(res.data.remainingCategories);
        setSelectValue("select");
      } catch (err) {
        console.log(err);
      }
      return;
    }
    if (val) {
      let temp = child.filter((s) => val === s.title);

      if (track.length <= 3) {
        setTrack([...track, { id: temp[0]._id, title: val }]);
        let ar = [...temp[0].children];
        setChild(ar);
      }
      setIsNewCat(false);
      setFormData({});
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      {track?.map((s, index) => (
        <button onClick={(e) => clickhandeler(e, index)} key={s.title}>
          {s.title}
        </button>
      ))}
      <div>
        <select ref={ref} onChange={changeHandeler} value={selectValue}>
          <option value={"select"}>Select One</option>
          {child.map((s) => {
            return (
              <option key={s._id} value={s.title}>
                {s.title}
              </option>
            );
          })}
          <option value={"addNew"}>Create New</option>
          <option value={"delete"}>Delete Category</option>
        </select>
      </div>
      {isNewCat && (
        <form onSubmit={submitHandeler}>
          <input
            onChange={formChange}
            type="text"
            placeholder="Category Name"
            name="name"
            value={formData.name || ""}
          />
          <input onChange={formChange} type="checkbox" name="check" />
          Contains Product ?
          <input type="submit" value="submit" />
        </form>
      )}
    </div>
  );
};

export default CategoriesController;
