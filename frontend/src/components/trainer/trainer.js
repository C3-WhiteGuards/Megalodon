import React, { useEffect, useState } from "react";
import "./trainer.css";
import axios from "axios";
import { useHistory } from "react-router";
import { Form } from "react-bootstrap";

export const Trainer = () => {
  const [trainers, setTrainer] = useState([]);
  const history = useHistory();
  const [search, setSearch] = useState("");

  const getAllTrainers = async () => {
    await axios.get("https://c3megalodon.herokuapp.com/trainer").then((res) => {
      setTrainer(res.data.allTrainers);
    });
  };
  useEffect(() => {
    getAllTrainers();
  }, []);

  return (
    <div>
      <div className="titleMain" style={{ paddingTop: "50px" }}>
        <h1> Our Professional Trainers </h1>
      </div>

      <Form>
        <Form.Group
          className="searchTrainer"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            type="text"
            placeholder="  Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Form.Group>
      </Form>

      <div className="AllTrainersClass">
        {trainers &&
          trainers
            .filter((val) => {
              if (search == "") {
                return val;
              } else if (
                val.firstName.toLowerCase().includes(search.toLowerCase()) ||
                val.lastName.toLowerCase().includes(search.toLowerCase()) ||
                val.sport.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((elem, i) => {
              return (
                <div
                  key={i}
                  className="trainrClass"
                  onClick={() => history.push(`/trainer/${elem.id}`)}
                >
                  <img src={elem.image} className="imgTrainer" />
                  <p className="nameTrainer">
                    {elem.firstName + " " + elem.lastName}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export const AddTrainer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [sport, setSport] = useState("");
  const [priceMonthly, setPriceMonthly] = useState(0);
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState(0);

  const addTrainers = async () => {
    await axios
      .post("https://c3megalodon.herokuapp.com/trainer", {
        firstName,
        lastName,
        phoneNumber,
        location,
        image,
        sport,
        priceMonthly,
        description,
        experience,
      })
      .then((res) => {});
  };

  return (
    <div>
      <input
        type="text"
        placeholder="firstName"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="lastName"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      ></input>

      <input
        type="number"
        placeholder="phoneNumber"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="location"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="Image Link"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="sport"
        onChange={(e) => {
          setSport(e.target.value);
        }}
      ></input>

      <input
        type="number"
        placeholder="priceMonthly"
        onChange={(e) => {
          setPriceMonthly(e.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>

      <input
        type="number"
        placeholder="experience"
        onChange={(e) => {
          setExperience(e.target.value);
        }}
      ></input>

      <button onClick={addTrainers}>add</button>
    </div>
  );
};
