import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastService from "../common/toastService";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        console.log(data,"datadata")
        let userData = data?.data;
        localStorage.setItem("getTheUserName", userData.username);
        localStorage.setItem("getTheUserId",userData?.userId);
        ToastService.successmsg(message);        
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        ToastService.errormsg(message);
      }
    } catch (error) {
      ToastService.errormsg("An error occurred!");
    }
    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
    <div className="form_container">
      <ToastContainer style={{ width: "auto" }} />
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
     
    </div>
    </div>
  );
};

export default Login;
