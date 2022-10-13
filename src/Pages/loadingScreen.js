import React from "react";
import "../css/loadingScreen.css";
import logo from "../assets/logo.PNG";

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <img className="logo-loading" src={logo} alt="logo"></img>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
