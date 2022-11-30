import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { Link, useNavigate } from 'react-router-dom';

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500 font-medium">
        To pole jest wymagane!
      </div>
    );
  }
};

const Login = () => {

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
        <Form onSubmit={handleLogin} ref={form} className="space-y-6">

          <h5 className="text-2xl text-center font-medium text-gray-900 dark:text-white">Logowanie</h5>

          <div>
            <label for="email" className="block mb-2 font-medium text-gray-900 dark:text-white">Login</label>
            <Input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            name="username"
            placeholder="Login"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />
          </div>
          <div>
            <label for="password" className="block mb-2 font-medium text-gray-900 dark:text-white">Hasło</label>
            <Input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          

          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Zaloguj</button>

          {message && (

            <div className="m-2 text-red-500 font-medium" role="alert">
              {message}
            </div>
          )}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Nie masz konta? <Link to={"/register"} className="text-blue-700 hover:underline dark:text-blue-500"> Zarejestruj się</Link>
          </div>
          <CheckButton  ref={checkBtn} />
        </Form>
      </div>


    </div>
  );
};

export default Login;