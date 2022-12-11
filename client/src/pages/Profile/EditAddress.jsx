import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Country, State, City } from 'country-state-city';

import { renderMatches, useNavigate, useParams } from 'react-router-dom';

import UserService from "../../services/user.service"
import AddressService from "../../services/address.service"
import AuthService from "../../services/auth.service"
import { useEffect } from "react";
import { useStateContext } from "../../services/ContextProvider";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500 font-medium">
        To pole jest wymagane!
      </div>
    );
  }
};

const EditAddress = () => {

    const currentUser = AuthService.getCurrentUser();

    let id = currentUser.id;

  const navigate = useNavigate()
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [editedUser, setEditedUser] = useState();

  const [formData, setFormData] = useState({

    country_code: "",
    building_number: "",
    apartment_number: "",
    street_name: "",
    city_name: "",
    voivodeship_name: "",
    country_name: "",
    voivodeship_name: "",
  });
  const [rerender, setRerender] = useState(false);

  useEffect(() => {

    UserService.getUser(id)
      .then(res => {
        setEditedUser(res.data);
        AddressService.getAddress(res.data.address_id)
          .then(response => {
            formData.apartment_number = response.data?.apartment_number
            formData.building_number = response.data?.building_number
            formData.street_name = response.data?.street?.name
            formData.city_name = response.data?.street?.city?.name
            formData.voivodeship_name = response.data?.street?.city?.voivodeship?.name
            formData.country_name = response.data?.street?.city?.voivodeship?.country?.name
            formData.country_code = response.data?.street?.city?.voivodeship?.country?.code
            setRerender(!rerender);
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error));
      
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleEditUser = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AddressService.addAddress(formData)
        .then(res => {
          UserService.editUserAddress(editedUser.id, { address_id: res.data.id })
            .then(() => navigate('/profile'))
        })

        .catch(error => console.error(error));
    }
  };

  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">
    <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">

      <Form onSubmit={handleEditUser} ref={form} className="space-y-6">
        <h5 className="text-2xl text-center font-medium text-gray-900 dark:text-white">Edytuj adres</h5>
        {!successful && (
            <>
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
                <input hidden type="text" onChange={onChange} name={formData.country_name} value={formData.country_name = Country.getCountryByCode(formData.country_code)?.name} />
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
                    <input hidden type="text" onChange={onChange} name={formData.voivodeship_name} value={formData.voivodeship_name = State.getStateByCode(formData.voivodeship_code)?.name} />
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
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Zatwierdź</button>
              <button onClick={() => navigate("/profile")} className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 ">Wróć  </button>

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
}

export default EditAddress