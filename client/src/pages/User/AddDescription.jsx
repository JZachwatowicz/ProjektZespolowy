import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Select from 'react-validation/build/select';

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
        .then(() => navigate('/descriptions'))
        .catch(error => console.log(error));
    }
  };

  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
    <>
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

      <div className="flex flex-wrap justify-center min-h-screen content-center">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
          <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj wpis</h1>

          <Form onSubmit={handlaAddDescription} ref={form} className="space-y-6">
            <hr />

            <div className="mb-6">
              <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tytuł</label>
              <Input
                type="text"
                className={formStyle}
                name="title"
                placeholder="Tytuł"
                value={formData.title}
                onChange={onChange}
                validations={[required]} />
            </div>
            <div className="mb-6">
              <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis</label>
              <Input
                type="text"
                className={formStyle}
                name="description"
                placeholder="Opis"
                value={formData.description}
                onChange={onChange}
                validations={[required]} />
            </div>

            <div className="mb-6">
              <label for="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pacjent</label>
              <Select name="user_id" onChange={onChange} className={formStyle} value={formData.user_id}>
                <option value="" disabled selected>Wybierz użytkownika</option>                {users.map((e, index) => {
                  return (<option key={index} value={e.id}>{e.first_name + " " + e.last_name}</option>)
                })}

              </Select>
            </div>

            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj</button>

            <button onClick={() => navigate("/descriptions")} className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 ">Wróć  </button>




            {console.log(Object.values(formData))}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddDescription