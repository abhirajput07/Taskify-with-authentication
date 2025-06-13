import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../server";
const LoginPage = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${serverUrl}/users/login`, loginInfo);
      document.cookie = `authToken=${data?.token}`;
      document.cookie = `name=${data?.name}`;
      document.cookie = `id=${data?._id}`;

      navigate("/todos");
      toast.success("Login Successfully");
      setLoginInfo({
        email: "",
        password: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="w-full p-2 flex justify-center">
        <div className="max-w-sm rounded border w-full px-[5%] md:px-[2%] py-[2%] bg-white text-black shadow-2xl shadow-black ">
          <h1 className="text-3xl mb-5 text-center">Login</h1>
          <form
            className="flex flex-col justify-between gap-5"
            onSubmit={handleSubmit}
          >
            <div className="space-x-5 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="outline-none border-b-2 py-2"
              />
            </div>{" "}
            <div className="space-x-5 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                value={loginInfo.password}
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="outline-none border-b-2 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-400 mb-2 rounded hover:bg-blue-600 transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
            <span className="text-center">
              Don't have an account?
              <Link to={"/register"} className="text-sm pl-2">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
