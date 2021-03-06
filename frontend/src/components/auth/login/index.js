import "./login.css";
import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/action/loginToken";
import { addToCart } from "../../../redux/action/cart";
import { addSubscription } from "../../../redux/action/cart";
import swal from "sweetalert";
export const Login = () => {
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);

  const [message, setMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const clientId =
    "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

  const userLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("https://c3megalodon.herokuapp.com/login", {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("token", token);
        localStorage.setItem("savedData", JSON.stringify([]));
        localStorage.setItem("subscription", JSON.stringify([]));
        dispatch(setToken(res.data.token));
        dispatch(addSubscription([]));
        //dispatch(addToCart([]));
        if (res.data.role === "admin") {
          history.push("/dashboard");
        } else {
          history.push("/home");
        }
      })

      .catch((error) => {
        if (error) {
          setMessage("Email or Password incorrect, please try again");
        }
      });
  };

  const onSuccess = async (res) => {
    await axios
      .post("https://c3megalodon.herokuapp.com/login/loginGoogle", {
        tokenId: res.tokenId,
      })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("savedData", JSON.stringify([]));
          localStorage.setItem("subscription", JSON.stringify([]));
          dispatch(setToken(res.data.token));
          dispatch(addSubscription([]));
          //dispatch(addToCart([]));
          history.push("/home");
        } else throw Error;
      })
      .catch((err) => {
        setMessage("Email or Password incorrect, please try again");
      });
  };

  const onFailure = (res) => {};

  const restPass = () => {
    swal({
      text: 'Please Enter your email".',
      content: "input",
      button: {
        text: "Send",
        closeModal: false,
      },
    }).then((email) => {
      if (!email) {
        swal.close();
        return;
      }

      axios
        .post("https://c3megalodon.herokuapp.com/login/restPass", {
          email,
        })
        .then((results) => {
          swal({
            title: "Success",
            text: "please check yor email to get new password",
            icon: "success",
          });
        })

        .catch((err) => {
          if (err.response.status === 404) {
            swal("Oh noes!", `email doesn't exist`, "error");
          } else {
            swal("Oh noes!", "The request failed!", "error");
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  return (
    <div className="section">
      <div className="imgBx">
        <img
          src="https://www.reviewsxp.com/blog/wp-content/uploads/2019/08/Best-gyms-in-jaipur-e1565704535975.jpg"
          alt="broken"
        />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>LOGIN</h2>

          <div className="inputBx">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inputBx">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="inputBx">
            <button className="" onClick={userLogin}>
              Sign In
            </button>
          </div>
          <div className="inputBx">
            <p style={{ color: "red", fontSize: "15px" }}>{message}</p>
            <div>
              <p>
                <a onClick={restPass}> Forget Your Password ? </a>{" "}
              </p>
            </div>

            <div className="with-gmail">
              <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
