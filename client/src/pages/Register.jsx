import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { isEmail } from "validator";

import Select from 'react-select';

import { Country, State, City } from 'country-state-city';

import AuthService from "../services/auth.service";



const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
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

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Login</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">Imię</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChange}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Nazwisko</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChange}
                  validations={[required]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="pesel">PESEL</label>
                <Input
                  type="text"
                  className="form-control"
                  name="pesel"
                  value={formData.pesel}
                  onChange={onChange}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Telefon</label>
                <Input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={onChange}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                ADRES
                <label htmlFor="buildingNumber">buildingNumber</label>
                <Input
                  type="text"
                  className="form-control"
                  name="buildingNumber"
                  value={formData.buildingNumber}
                  onChange={onChange}
                  validations={[required]}
                />
                <label htmlFor="apartmentNumber">apartmentNumber</label>
                <Input
                  type="text"
                  className="form-control"
                  name="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={onChange}
                />
                <label htmlFor="streetName">streetName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="streetName"
                  value={formData.streetName}
                  onChange={onChange}
                />
                {/* {console.log(City.getAllCities())} */}
                {/* <DropDownListComponent>

                </DropDownListComponent> */}
                {/* <Select
                  options={aquaticCreatures}
                  onChange={opt => console.log(opt.label, opt.value)}
                /> */}




                <label htmlFor="countryName">countryName</label>
                <select name="countryCode" value={formData.countryCode} onChange={onChange} >
                  
                  {Country.getAllCountries().map(e =>
                    <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                </select>

                {formData.countryCode ?
                 <input hidden type="text" onChange={onChange} name={formData.countryName} value={formData.countryName = Country.getCountryByCode(formData.countryCode).name} />
                  : null}
                {State.getStatesOfCountry(formData.countryCode).length !== 0 ?

                  <>
                    <label htmlFor="voivodeshipName">voivodeshipName</label>
                    <select name="voivodeshipCode" value={formData.voivodeshipCode} onChange={onChange}>
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
                        <label htmlFor="cityName">cityName</label>
                        <select name="cityName" value={formData.cityName} onChange={onChange}>
                          {City.getCitiesOfCountry(formData.countryCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                        </select>
                      </>
                      : null}
                  </>
                }
                {City.getCitiesOfState(formData.countryCode, formData.voivodeshipCode).length !== 0 ?
                  <>
                    <label htmlFor="cityName">cityName</label>
                    <select name="cityName" value={formData.cityName} onChange={onChange}>
                      {City.getCitiesOfState(formData.countryCode, formData.voivodeshipCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                    </select>
                  </>
                  : null}
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
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