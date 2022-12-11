import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { useNavigate } from 'react-router-dom';

import UserService from "../../services/user.service"


const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500 font-medium">
        To pole jest wymagane!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="text-red-500 font-medium">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="text-red-500 font-medium">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-red-500 font-medium">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
}



const vpesel = (pesel) => {
  if (pesel.length !== 11) return (
    <div className="text-red-500 font-medium">
      PESEL musi mieć 11 znaków
    </div>
  );

  var wagi = [9,7,3,1,9,7,3,1,9,7];
  var suma = 0;
  for(var i=0;i < wagi.length; i++)
  {
      suma+=(parseInt(pesel.substring(i,i+1),10)*wagi[i]);
  }

  suma=suma % 10;

  var cyfraKontr = parseInt(pesel.substring(10,11),10);
  var poprawnosc = (suma === cyfraKontr);
  if (!poprawnosc) {
    return (
      <div className="text-red-500 font-medium">
        PESEL nie jest prawidłowy
      </div>
    );
  }
}

const AddUser = () => {

  const navigate = useNavigate()
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    pesel: "",
    contact_number: "",
    role_id: '1'
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      UserService.addUser(formData)
        .then(() => navigate('/users'))
        .catch(error => console.log(error));
    }
  };

  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">


        <Form onSubmit={handleAddUser} ref={form} className="space-y-6">
          <h5 className="text-2xl text-center font-medium text-gray-900 dark:text-white">Dodaj użytkownika</h5>

          {!successful && (
            <>
              <div className="mb-6">
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                <Input
                  type="text"
                  className={formStyle}
                  name="username"
                  placeholder="Login"
                  value={formData.username}
                  onChange={onChange}
                  validations={[required, vusername]} />
              </div>

              <div className="mb-6">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
                <Input
                  type="password"
                  className={formStyle}
                  name="password"
                  placeholder="*********"
                  value={formData.password}
                  onChange={onChange}
                  validations={[required, vpassword]} />
              </div>

              <div className="mb-6">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <Input
                  type="text"
                  className={formStyle}
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={onChange}
                  validations={[required, validEmail]} />
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię</label>
                  <Input
                    type="text"
                    className={formStyle}
                    name="first_name"
                    placeholder="Imię"
                    value={formData.first_name}
                    onChange={onChange}
                    validations={[required]} />
                </div>
                <div>
                  <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwisko</label>
                  <Input
                    type="text"
                    className={formStyle}
                    name="last_name"
                    placeholder="Nazwisko"
                    value={formData.last_name}
                    onChange={onChange}
                    validations={[required]} />
                </div>
                <div>
                  <label for="pesel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PESEL</label>
                  <Input
                    type="text"
                    className={formStyle}
                    name="pesel"
                    placeholder="PESEL"
                    value={formData.pesel}
                    onChange={onChange}
                    validations={[required, vpesel]} />
                </div>
                <div>
                  <label for="contact_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon</label>
                  <Input
                    type="text"
                    className={formStyle}
                    name="contact_number"
                    placeholder="Telefon"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                    value={formData.contact_number}
                    onChange={onChange}
                    validations={[required]} />
                </div>
              </div>
              <div className="mb-6">
                <label for="role_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rola</label>
                <select name="role_id" value={formData.role_id} className={formStyle} onChange={onChange}>
                <option value={1} defaultValue>Użytkownik</option>
                <option value={2}>Pracownik</option>
                <option value={3}>Admin</option>
              </select>
              </div>
              

              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj</button>
              <button onClick={() => navigate("/users")} className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 ">Wróć  </button>

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

export default AddUser