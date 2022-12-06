import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { useNavigate } from 'react-router-dom';

import UserService from "../../services/user.service"
import DescriptionService from "../../services/description.service"
import AuthService from "../../services/auth.service"


const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500 font-medium">
        To pole jest wymagane!
      </div>
    );
  }
};


const AddDescription = () => {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate()
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: currentUser.id,
    user_id: ""
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.showUsers()
      .then(res => setUsers(res.data))
      .catch(error => {
        console.log(error)
        setMessage(error.message)
        setSuccessful(false)
      });

  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlaAddDescription = (e) => {
    e.preventDefault();

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      DescriptionService.post_description(formData)
        .then(() => navigate('/employee/descriptions'))
        .catch(error => console.log(error));
    }
  };

  const formStyle = "form-control p-3 m-2 border-b-2 shadow-md"

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">



      <div className="p-11 shadow-2xl">
        <h1 className="mb-8 text-center font-semibold">Dodaj wpis dla użytkownika</h1>

        <Form onSubmit={handlaAddDescription} ref={form} className="flex-2 text-center">
          {!successful && (
            <><div>
              <Input
                type="text"
                className={formStyle}
                name="title"
                placeholder="title"
                value={formData.title}
                onChange={onChange}
                validations={[required]} />

              <Input
                type="text"
                className={formStyle}
                name="description"
                placeholder="description"
                value={formData.description}
                onChange={onChange}
                validations={[required]} />

              <select name="user_id" onChange={onChange} value={formData.user_id}>
              <option value="" disabled selected>Wybierz użytkownika</option>                {users.map((e, index) => {
                  return (<option key={index} value={e.id}>{e.first_name + " " + e.last_name}</option>)
                })}

              </select>


            </div>
              <button className="p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white">Dodaj</button>
            </>

          )}

          {message && (
            <div
              className={
                successful ? "m-2 text-green-500 font-medium" : "m-2 text-red-500 font-medium"
              }
              role="alert"
            >
              {message}
            </div>
          )}
          {console.log(Object.values(formData))}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default AddDescription