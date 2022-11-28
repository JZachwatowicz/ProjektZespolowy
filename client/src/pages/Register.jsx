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
    first_name: "",
    last_name: "",
    pesel: "",
    contact_number: "",
    building_number: "",
    apartment_number: "",
    street_name: "",
    city_name: "",
    voivodeship_name: "",
    voivodeship_code: "",
    country_name: "",
    country_code: "",

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
        formData.first_name,
        formData.last_name,
        formData.pesel,
        formData.contact_number,
        formData.building_number,
        formData.apartment_number,
        formData.street_name,
        formData.city_name,
        formData.voivodeship_name,
        formData.country_name,
        formData.country_code

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
  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  // Swap default select to react component
  // const countries = Country.getAllCountries().map(e => {
  //   return {
  //     value: e.isoCode,
  //     label: e.name
  //   }
  // })
  // console.log(countries)
  //               <Select name="country_code" value={formData.country_code} onChange={onChange} className={formStyle} options={countries} /> 

  return (

    <div className="flex flex-wrap justify-center min-h-screen content-center">
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">

        <Form onSubmit={handleRegister} ref={form} className="space-y-6">
          <h5 className="text-2xl text-center font-medium text-gray-900 dark:text-white">Rejestracja</h5>
          {!successful && (
            <>
              <div className="mb-6">
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
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
                    validations={[required]} />
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
              <div className="grid gap-4 mb-6 md:grid-cols-2">
                <div>
                  <label for="street_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ulica</label>
                  <Input
                    type="text"
                    className={formStyle}
                    name="street_name"
                    placeholder="Ulica"
                    value={formData.street_name}
                    onChange={onChange}
                    validations={[required]} />

                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label for="building_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nr domu</label>
                    <Input
                      type="text"
                      className={formStyle}
                      name="building_number"
                      placeholder="Nr domu"
                      value={formData.building_number}
                      onChange={onChange}
                      validations={[required]} />
                  </div>
                  <div>
                    <label for="apartment_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nr mieszkania</label>
                    <Input
                      type="text"
                      className={formStyle}
                      name="apartment_number"
                      placeholder="Nr mieszkania"
                      value={formData.apartment_number}
                      onChange={onChange} />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label for="country_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kraj</label>
                <select name="country_code" value={formData.country_code} onChange={onChange} className={formStyle}>
                  {Country.getAllCountries().map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                </select>
              </div>
              {formData.country_code ?
                <input hidden type="text" onChange={onChange} name={formData.country_name} value={formData.country_name = Country.getCountryByCode(formData.country_code).name} />
                : null}
              {State.getStatesOfCountry(formData.country_code).length !== 0 ?

                <>
                  <div className="mb-6">
                    <label for="voivodeship_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Region</label>
                    <select name="voivodeship_code" value={formData.voivodeship_code} onChange={onChange} className={formStyle}>
                      {State.getStatesOfCountry(formData.country_code).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                    </select>
                  </div>
                  {formData.voivodeship_code ?
                    <input hidden type="text" onChange={onChange} name={formData.voivodeship_name} value={formData.voivodeship_name = State.getStateByCode(formData.voivodeship_code).name} />
                    : null}
                </>
                :
                <>
                  {City.getCitiesOfCountry(formData.country_code).length !== 0 ?
                    <>
                      <div className="mb-6">
                        <label for="city_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Miasto</label>
                        <select name="city_name" value={formData.city_name} onChange={onChange} className={formStyle}>
                          {City.getCitiesOfCountry(formData.country_code).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                        </select>
                      </div>
                    </>
                    : null}
                </>}
              {City.getCitiesOfState(formData.country_code, formData.voivodeship_code).length !== 0 ?
                <>
                  <div className="mb-6">
                    <label for="city_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Miasto</label>
                    <select name="city_name" value={formData.city_name} onChange={onChange} className={formStyle}>
                      {City.getCitiesOfState(formData.country_code, formData.voivodeship_code).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                    </select>
                  </div>
                </>
                : null}


              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Zarejestruj</button>














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