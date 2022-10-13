import React, { useEffect, useState } from "react";
import logo from "../assets/logo.PNG";
import {
  AiOutlineEye,
  AiFillEye,
  AiFillUnlock,
  AiFillLock,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../css/createAccount.css";
import LoadingScreen from "./loadingScreen";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [isEyeActive, setIsEyeActive] = useState(false);
  const [isEyeActiveRepeat, setisEyeActiveRepeat] = useState(false);
  const [isLock, setIsLock] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [infoCountries, setInfoCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [idiom, setIdiom] = React.useState("English");
  const [country, setCountry] = useState("");

  const [isTemrs, setIsTemrs] = useState(false);

  const changeState = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 5000);
  };

  useEffect(() => {
    fetch("http://localhost:30004/countries")
      .then((res) => res.json())
      .then((data) => {
        setInfoCountries(data);
      });
  }, []);

  const changeVisibility = (num) => {
    if (num === 1) {
      setIsEyeActive(!isEyeActive);
    } else if (num === 2) {
      setisEyeActiveRepeat(!isEyeActiveRepeat);
    } else {
      setIsLock(!isLock);
    }
  };

  const submitInfo = () => {
    if (!isTemrs) {
      alert("you need to accept the terms and conditions to continue");
    } else if (
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      country === ""
    ) {
      alert("no input can be empty");
    } else if (password !== passwordConfirm) {
      alert("the passwords you entered did not match");
    } else {
      let info = {
        email,
        password,
        idiom,
        country,
      };

      fetch("http://localhost:30004/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((response) => response.json())
        .then((info) => {
          console.log("Success:", info);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      alert("saved user ");

      changeState();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="content">
      <div className="content-login">
        <form>
          <div className="d-flex justify-content-center logo-create-account">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="text-center title-create-account">
            <h1>Create your account</h1>
          </div>

          <div className="mb-3 input-email-create-user">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isLock ? (
              <AiFillUnlock
                className="lock-create-user"
                onClick={() => changeVisibility(3)}
              />
            ) : (
              <AiFillLock
                className="lock-create-user"
                onClick={() => changeVisibility(3)}
              />
            )}
          </div>

          <div className="mb-3 input-password-create-user">
            <input
              type={isEyeActive ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isEyeActive ? (
              <AiFillEye
                className="eye-create-user"
                onClick={() => changeVisibility(1)}
              />
            ) : (
              <AiOutlineEye
                className="eye-create-user"
                onClick={() => changeVisibility(1)}
              />
            )}
          </div>

          <div className="mb-3 input-password-create-user">
            <input
              type={isEyeActiveRepeat ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Retype Password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {isEyeActiveRepeat ? (
              <AiFillEye
                className="eye-create-user"
                onClick={() => changeVisibility(2)}
              />
            ) : (
              <AiOutlineEye
                className="eye-create-user"
                onClick={() => changeVisibility(2)}
              />
            )}
          </div>

          <div className="dropdown-content">
            <select onChange={(e) => setCountry(e.target.value)}>
              <option selected disabled value="">
                Country of Residence
              </option>

              {infoCountries.map((contries, i) => (
                <option key={i}>{contries.country}</option>
              ))}
            </select>
          </div>

          <div className="dropdown-content">
            <select onChange={(e) => setIdiom(e.target.value)}>
              <option>English</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>

          <div className="mb-3 form-check">
            <input
              className="form-check-input check"
              onClick={() => setIsTemrs(!isTemrs)}
              type="checkbox"
              id="exampleCheck1"
            />
            <label className="form-check-label">
              By continuing i agree to the <span>Terms of Services</span> and{" "}
              <span>Privacy Policy</span>
            </label>
          </div>

          <div className="button-login-create-user">
            <button
              onClick={() => submitInfo()}
              type="submit"
              className="btn btn-primary"
            >
              Sign up
            </button>
          </div>
        </form>
        <hr />
        <p className="footer">
          Have an account ? <span onClick={() => changeState()}>log in</span>{" "}
          instead.
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
