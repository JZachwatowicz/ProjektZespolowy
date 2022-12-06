import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { renderMatches, useNavigate, useParams } from 'react-router-dom';

import UserService from "../../services/user.service"
import AddressService from "../../services/address.service"
import { useEffect } from "react";


const EditUserAddress = () => {

  let { id } = useParams();

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
            .then(() => navigate('/users'))
        })

        .catch(error => console.error(error));
    }
  };

  const formStyle = "form-control p-3 m-2 border-b-2 shadow-md"

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">



      <div className="p-11 shadow-2xl">
        <h1 className="mb-8 text-center font-semibold">Edytuj adres</h1>

        <Form onSubmit={handleEditUser} ref={form} className="flex-2 text-center">
          {!successful && (
            <><div>
              <Input
                type="text"
                className={formStyle}
                name="street_name"
                placeholder="Ulica"
                value={formData.street_name}
                onChange={onChange}
              />
              <Input
                type="text"
                className={formStyle}
                name="building_number"
                placeholder="Nr domu"
                value={formData.building_number}
                onChange={onChange}
              />
              <Input
                type="text"
                className={formStyle}
                name="apartment_number"
                placeholder="Nr mieszkania"
                value={formData.apartment_number}
                onChange={onChange} />
              <Input
                type="text"
                className={formStyle}
                name="country_code"
                placeholder="Ulica"
                value={formData.country_code}
                onChange={onChange}
              />
              <Input
                type="text"
                className={formStyle}
                name="country_name"
                placeholder="country_name"
                value={formData.country_name}
                onChange={onChange}
              />


              <Input
                type="text"
                className={formStyle}
                name="city_name"
                placeholder="Miasto"
                value={formData.city_name}
                onChange={onChange}
              />
              <Input
                type="text"
                className={formStyle}
                name="voivodeship_name"
                placeholder="Wojewodztwo"
                value={formData.voivodeship_name}
                onChange={onChange}
              />


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
  );
}

export default EditUserAddress