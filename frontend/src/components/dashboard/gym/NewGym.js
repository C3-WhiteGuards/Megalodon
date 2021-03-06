import style from "../trainer/newTrainer.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function NewGym () {
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [image, setImage] = useState();
  const [monthlyPrice, setMonthlyPrice] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [description, setDescription] = useState();
  const [message, setMessage] = useState("");

  const createNewGym = async () => {
    await axios
      .post(`https://c3megalodon.herokuapp.com/gym`, {
        name,
        location,
        image,
        monthlyPrice,
        phoneNumber,
        description,
      })
      .then((res) => {
        setMessage(res.data.message);
      });
  };
  return (
    <div className={style.newUser}>
      <h1 className={style.newUserTitle}>New Gym</h1>
      <form className={style.newUserForm}>
        <div className={style.newUserItem}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Golden Gym"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={style.newUserItem}>
          <label>Price</label>
          <input
            type="text"
            placeholder="price"
            onChange={(e) => {
              setMonthlyPrice(e.target.value);
            }}
          />
        </div>
        <div className={style.newUserItem}>
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>

        <div className={style.newUserItem}>
          <label>Location</label>
          <textarea
            rows="5"
            cols="50"
            placeholder="Location URL"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          ></textarea>
        </div>
        <div className={style.newUserItem}>
          <label>Description</label>
          <textarea
            rows="5"
            cols="50"
            placeholder="Location URL"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <div className={style.newUserItem}>
          <label>Image</label>
          <textarea
            rows="5"
            cols="50"
            placeholder="Image URL"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          ></textarea>
        </div>
      </form>
      <button className={style.newUserButton} onClick={createNewGym}>
        Create
      </button>
      <p>{message}</p>
    </div>
  );
}
