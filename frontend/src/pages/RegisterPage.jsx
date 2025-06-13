import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../server.js";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${serverUrl}/users/register`, signupInfo);
      toast.success("Register successfully");
      setSignupInfo({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="w-full  p-2 flex justify-center">
        <div className="max-w-sm rounded border w-full px-[5%] py-[2%] bg-white text-black shadow-2xl shadow-black ">
          <h1 className="text-3xl mb-5 text-center">Signup</h1>
          <form
            className="flex flex-col justify-between gap-5"
            onSubmit={handleSubmit}
          >
            <div className="space-x-5 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={signupInfo.name}
                onChange={handleChange}
                name="name"
                autoFocus
                required
                placeholder="Enter your name"
                className="outline-none border-b-2 py-2"
              />
            </div>
            <div className="space-x-5 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="outline-none border-b-2 py-2"
              />
            </div>{" "}
            <div className="space-x-5 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="outline-none border-b-2 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-400 mb-2 rounded hover:bg-blue-600 transition-all duration-300 cursor-pointer"
            >
              Signup
            </button>
            <span className="text-center">
              Already have an account?{""}
              <Link to={"/login"} className="text-sm pl-2">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
