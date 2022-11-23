import React, { useState, useRef } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import { useNavigate } from 'react-router-dom';
import DepartmentService from '../../services/department.service'
import { useStateContext } from '../../services/ContextProvider';
import { Country, State, City } from 'country-state-city';

const required = (value) => {
    if (!value) {
      return (
        <div className="text-red-500 font-medium">
          To pole jest wymagane!
        </div>
      );
    }
  };
  
  const vname = (value) => {
    if (value.length > 45) {
      return (
        <div className="text-red-500 font-medium">
          Nazwa aktywności nie może przekraczać 100 znaków.
        </div>
      );
    }
  };
  const vdesc = (value) => {
    if ( value.length > 250) {
      return (
        <div className="text-red-500 font-medium">
          Description of the activity has to be under 250 characters.
        </div>
      );
    }
  };
  
  

const AddDepartment = () => {

    const form = useRef();
    const checkBtn = useRef();
    const { screenSize } = useStateContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        buildingNumber: "09",
        apartmentNumber: "09",
        streetName: "Dog",
        cityName: "",
        voivodeshipName: "",
        voivodeshipCode: "",
        countryName: "",
        countryCode: "",
    
      });
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
  

  const addDepartmentHandler = async (e) => {

      e.preventDefault()

      setMessage("");
      setSuccessful(false)


      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
          DepartmentService.addDepartment(formData.name,formData.description, formData.apartmentNumber, formData.buildingNumber, formData.streetName, formData.cityName, formData.voivodeshipName, formData.countryName, formData.countryCode).then(
              ()=> {
                  //navigate("/departments", { state: { message: "Successfully added department.", successful: true } })
                 // window.location.reload();
                  //setSuccessful(true);
                  //setMessage("Successfuly added department.");
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
    }

    const handleCancel = () => {
      navigate("/department");
  };


    return (
      <>
        <div className='flex flex-wrap justify-center content-center p-3'>
              {message &&  (
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
          <div className={`p-11 shadow-2xl mb-20  ${screenSize <= 800 ? 'w-full' : 'w-10/12'}`}>
            <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj Wydział</h1>
            <hr />
            
              <Form onSubmit={addDepartmentHandler} ref={form} className="pt-4 flex-2 text-center text-black">
                <Input  className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={formData.name}
                    name="name"
                    placeholder="Nazwa"
                    onChange={onChange}
                    type="text"
                    validations={[required, vname]}
                  />
                <Textarea className="form-control p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl "
                    value={formData.description}
                    name="description"
                    rows="3"
                    placeholder="Opis"
                    onChange={onChange}
                    validations={[vdesc]}
                    />
                <Input  className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={formData.apartmentNumber}
                    name="aprtment"
                    placeholder="Nr mieszkania"
                    onChange={onChange}
                    type="text"
                    validations={[required]}
                  />
                  <Input  className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={formData.buildingNumber}
                    name="building"
                    placeholder="Numer budynku"
                    onChange={onChange}
                    type="text"
                    validations={[required]}
                  />
                  <Input  className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={formData.streetName}
                    name="street"
                    placeholder="Ulica"
                    onChange={onChange}
                    type="text"
                    validations={[required]}
                  />
                  <select name="countryCode" value={formData.countryCode} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">

                {Country.getAllCountries().map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                </select>

                {formData.countryCode ?
                <input hidden type="text" onChange={onChange} name={formData.countryName} value={formData.countryName = Country.getCountryByCode(formData.countryCode).name} />
                : null}
                {State.getStatesOfCountry(formData.countryCode).length !== 0 ?

                <>
                <select name="voivodeshipCode" value={formData.voivodeshipCode} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">
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
                    <select name="cityName" value={formData.cityName} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">
                        {City.getCitiesOfCountry(formData.countryCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                    </select>
                    </>
                    : null}
                </>}
                {City.getCitiesOfState(formData.countryCode, formData.voivodeshipCode).length !== 0 ?
                <>
                <select name="cityName" value={formData.cityName} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">
                    {City.getCitiesOfState(formData.countryCode, formData.voivodeshipCode).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                </select>
                </>
                : null}
                <div className='m-auto'>
                  <button  className='p-4 shadow-xl m-2 rounded-lg bg- border-1 bg-gray-600 text-white hover:bg-gray-400 hover:text-black' type="submit">
                      Dodaj
                  </button>
                  <button  className='p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-400 hover:text-white' type="Reset" onClick={handleCancel}>
                      Anuluj
                  </button>
                </div>
               
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
          </div>
        </div>
      </>
    )
}

export default AddDepartment
