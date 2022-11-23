import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// import Select from 'react-select';

import { Country, State, City } from 'country-state-city';

import AuthService from "../services/auth.service";



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
const Register = (props) => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    pesel: "",
    contactNumber: "",
    buildingNumber: "",
    apartmentNumber: "",
    streetName: "",
    cityName: "",
    voivodeshipName: "",
    voivodeshipCode: "",
    countryName: "",
    countryCode: "",

  });
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        formData.username,
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.pesel,
        formData.contactNumber,
        formData.buildingNumber,
        formData.apartmentNumber,
        formData.streetName,
        formData.cityName,
        formData.voivodeshipName,
        formData.countryName,
        formData.countryCode

      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  const formStyle = "form-control p-3 m-2 border-b-2 shadow-md"
  // Swap default select to react component
  // const countries = Country.getAllCountries().map(e => {
  //   return {
  //     value: e.isoCode,
  //     label: e.name
  //   }
  // })
  // console.log(countries)
  //               <Select name="countryCode" value={formData.countryCode} onChange={onChange} className={formStyle} options={countries} /> 

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">



      <div className="p-11 shadow-2xl">
        <h1 className="mb-8 text-center font-semibold">Rejestracja</h1>

        <Form onSubmit={handleRegister} ref={form} className="flex-2 text-center">
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
                validations={[required, vpassword]} />

              <Input
                type="text"
                className={formStyle}
                name="firstName"
                placeholder="Imię"
                value={formData.firstName}
                onChange={onChange}
                validations={[required]} />

              <Input
                type="text"
                className={formStyle}
                name="lastName"
                placeholder="Nazwisko"
                value={formData.lastName}
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
                name="contactNumber"
                placeholder="Telefon"
                value={formData.contactNumber}
                onChange={onChange}
                validations={[required]} />
              <Input
                type="text"
                className={formStyle}
                name="streetName"
                placeholder="Ulica"
                value={formData.streetName}
                onChange={onChange}
                validations={[required]} />
              <Input
                type="text"
                className={formStyle}
                name="buildingNumber"
                placeholder="Nr domu"
                value={formData.buildingNumber}
                onChange={onChange}
                validations={[required]} />
              <Input
                type="text"
                className={formStyle}
                name="apartmentNumber"
                placeholder="Nr mieszkania"
                value={formData.apartmentNumber}
                onChange={onChange} />
              <select name="countryCode" value={formData.countryCode} onChange={onChange} className={formStyle}>

                {Country.getAllCountries().map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
              </select>

              {formData.countryCode ?
                <input hidden type="text" onChange={onChange} name={formData.countryName} value={formData.countryName = Country.getCountryByCode(formData.countryCode).name} />
                : null}
              {State.getStatesOfCountry(formData.countryCode).length !== 0 ?

                <>
                  <select name="voivodeshipCode" value={formData.voivodeshipCode} onChange={onChange} className={formStyle}>
                    {State.getStatesOfCountry(formData.countryCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                  </select>
                  {formData.voivodeshipCode ?
                    <input hidden type="text" onChange={onChange} name={formData.voivodeshipName} value={formData.voivodeshipName = State.getStateByCode(formData.voivodeshipCode).name} />
                    : null}
                </>
                :
                <>
                  {City.getCitiesOfCountry(formData.countryCode).length !== 0 ?
                    <>
                      <select name="cityName" value={formData.cityName} onChange={onChange} className={formStyle}>
                        {City.getCitiesOfCountry(formData.countryCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                      </select>
                    </>
                    : null}
                </>}
              {City.getCitiesOfState(formData.countryCode, formData.voivodeshipCode).length !== 0 ?
                <>
                  <select name="cityName" value={formData.cityName} onChange={onChange} className={formStyle}>
                    {City.getCitiesOfState(formData.countryCode, formData.voivodeshipCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                  </select>
                </>
                : null}
            </div>
              <button className="p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white">Zarejestruj</button>
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
  );
};

export default Register;