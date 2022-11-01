import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [pesel, setPesel] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [cityName, setCityName] = useState("");
  const [voivodeshipName, setVoivodeshipName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");


  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeBuildingNumber = (e) => {
    const buildingNumber = e.target.value;
    setBuildingNumber(buildingNumber);
  };
  const onChangeApartmentNumber = (e) => {
    const apartmentNumber = e.target.value;
    setApartmentNumber(apartmentNumber);
  };
  const onChangeStreetName = (e) => {
    const streetName = e.target.value;
    setStreetName(streetName);
  };
  const onChangeCityName = (e) => {
    const cityName = e.target.value;
    setCityName(cityName);
  };
  const onChangeVoivodeshipName = (e) => {
    const voivodeshipName = e.target.value;
    setVoivodeshipName(voivodeshipName);
  };
  const onChangeCountryName = (e) => {
    const countryName = e.target.value;
    setCountryName(countryName);
  };
  const onChangeCountryCode = (e) => {
    const countryCode = e.target.value;
    setCountryCode(countryCode);
  };


  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeBirthDate = (e) => {
    const birthDate = e.target.value;
    setBirthDate(birthDate);
  };

  const onChangeContactNumber = (e) => {
    const contactNumber = e.target.value;
    setContactNumber(contactNumber);
  };
  const onChangePesel = (e) => {
    const pesel = e.target.value;
    setPesel(pesel);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        password,
        firstName,
        lastName,
        birthDate,
        pesel,
        contactNumber,
        buildingNumber,
        apartmentNumber,
        streetName,
        cityName,
        voivodeshipName,
        countryName,
        countryCode
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
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">Imię</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Nazwisko</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={onChangeLastName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate">Data urodzenia</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birthDate"
                  maxDate={new Date()}
                  value={birthDate}
                  onChange={onChangeBirthDate}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pesel">PESEL</label>
                <Input
                  type="text"
                  className="form-control"
                  name="pesel"
                  value={pesel}
                  onChange={onChangePesel}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Telefon</label>
                <Input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={onChangeContactNumber}
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
                  value={buildingNumber}
                  onChange={onChangeBuildingNumber}
                  validations={[required]}
                />
                <label htmlFor="apartmentNumber">apartmentNumber</label>
                <Input
                  type="text"
                  className="form-control"
                  name="apartmentNumber"
                  value={apartmentNumber}
                  onChange={onChangeApartmentNumber}
                />
                <label htmlFor="streetName">streetName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="streetName"
                  value={streetName}
                  onChange={onChangeStreetName}
                />
                <label htmlFor="cityName">cityName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cityName"
                  value={cityName}
                  onChange={onChangeCityName}
                />
                <label htmlFor="streetName">voivodeshipName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="voivodeshipName"
                  value={voivodeshipName}
                  onChange={onChangeVoivodeshipName}
                />
                <label htmlFor="countryName">countryName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="countryName"
                  value={countryName}
                  onChange={onChangeCountryName}
                />
                <label htmlFor="countryCode">countryCode</label>
                <Input
                  type="text"
                  className="form-control"
                  name="countryCode"
                  value={countryCode}
                  onChange={onChangeCountryCode}
                />
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;