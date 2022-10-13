import React, { useState } from "react";
import "../css/login.css";
import logo from "../assets/logo.PNG";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./loadingScreen";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isEyeActive, setIsEyeActive] = useState(false);

  const changeVisibility = () => {
    setIsEyeActive(!isEyeActive);
  };

  const changeState = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/create-account");
    }, 5000);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="content">
      <div className="content-login">
        <form>
          <div className="d-flex justify-content-center logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="text-center title">
            <h1>Welcome Back</h1>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
            />
          </div>

          <div className="mb-3 input-password">
            <input
              type={isEyeActive ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            {isEyeActive ? (
              <AiFillEye className="eye" onClick={() => changeVisibility()} />
            ) : (
              <AiOutlineEye
                className="eye"
                onClick={() => changeVisibility()}
              />
            )}
          </div>

          <div className="forgot-password">
            <span>Forgot Password </span>
          </div>

          <div className="mb-3 form-check">
            <input 
              type="checkbox"
              className="form-check-input check"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me.
            </label>
          </div>
          <div className="button-login">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
        <hr />
        <p>
          Don't have an account?
          <span onClick={() => changeState()}> Sing up </span> instead.
        </p>
      </div>
    </div>
  );
};

export default Login;
