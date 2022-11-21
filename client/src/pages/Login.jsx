import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';

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

      <div className="p-11  shadow-2xl mb-20">
        <h1 className="mb-8 text-center font-semibold">Logowanie</h1>

        <Form onSubmit={handleLogin} ref={form} className="flex-2 text-center text-black">

          <Input
            type="text"
            className="form-control p-3 m-2 border-b-2 shadow-md"
            name="username"
            placeholder="Login"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />

          <Input
            type="password"
            className="form-control p-3 m-2 border-b-2 shadow-md"
            name="password"
            placeholder="Hasło"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />


          <button className={"p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white"}>
            Zaloguj
          </button>


          {message && (

            <div className="m-2 text-red-500 font-medium" role="alert">
              {message}
            </div>

          )}
          <CheckButton  ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;