import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { useNavigate, useParams } from 'react-router-dom';

import UserService from "../../services/user.service"
import { useEffect } from "react";
import { useStateContext } from "../../services/ContextProvider";
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

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="text-red-500 font-medium">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// }

const EditProfile = () => {

    const currentUser = AuthService.getCurrentUser();


let id = currentUser.id;


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
    role_id: currentUser.role_id
  });

  useEffect(() => {
    UserService.getUser(id)
      .then(res => {
        setFormData(res.data);
      })
      .catch(error => console.log(error))
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditUser = (e) => {
    e.preventDefault();

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      UserService.editUser(id,formData)
        .then(() => navigate('/profile'))
        .catch(error => console.log(error));
    }
  };

  const formStyle = "form-control p-3 m-2 border-b-2 shadow-md"

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">



      <div className="p-11 shadow-2xl">
        <h1 className="mb-8 text-center font-semibold">Edytuj dane</h1>

        <Form onSubmit={handleEditUser} ref={form} className="flex-2 text-center">
          {!successful && (
            <><div>
              <Input
                type="text"
                className={formStyle}
                name="username"
                placeholder="Login"
                value={formData.username}
                onChange={onChange}
                validations={[required, vusername]} />

              <Input
                type="text"
                className={formStyle}
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={onChange}
                validations={[required, validEmail]} />

              <Input
                type="password"
                className={formStyle}
                name="password"
                placeholder="Hasło"
                value={formData.password}
                onChange={onChange}
                validations={[required]} />

              <Input
                type="text"
                className={formStyle}
                name="first_name"
                placeholder="Imię"
                value={formData.first_name}
                onChange={onChange}
                validations={[required]} />

              <Input
                type="text"
                className={formStyle}
                name="last_name"
                placeholder="Nazwisko"
                value={formData.last_name}
                onChange={onChange}
                validations={[required]} />

              <Input
                type="text"
                className={formStyle}
                name="pesel"
                placeholder="PESEL"
                value={formData.pesel}
                onChange={onChange}
                validations={[required]} />

              <Input
                type="text"
                className={formStyle}
                name="contact_number"
                placeholder="Telefon"
                value={formData.contact_number}
                onChange={onChange}
                validations={[required]} />

            </div>
              <button className="p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white">Zapisz</button>
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

export default EditProfile