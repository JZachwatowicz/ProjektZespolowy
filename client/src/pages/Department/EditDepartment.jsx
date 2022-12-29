import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import { useNavigate, useParams } from 'react-router-dom';
import DepartmentService from '../../services/department.service'
import { useStateContext } from '../../services/ContextProvider';
import { Country, State, City } from 'country-state-city';
import AddressService from "../../services/address.service"

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
    if (value.length > 250) {
        return (
            <div className="text-red-500 font-medium">
                Description of the activity has to be under 250 characters.
            </div>
        );
    }
};



const EditDepartment = () => {

    let { id } = useParams();

    const form = useRef();
    const checkBtn = useRef();
    const { screenSize } = useStateContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        country_code: "",
        building_number: "",
        apartment_number: "",
        street_name: "",
        city_name: "",
        voivodeship_name: "",
        country_name: "",
        voivodeship_code: ""
    });
    const [rerender, setRerender] = useState(false);
    const [addressId, setAddressId] = useState(-1);

    const [editedDepartment, setEditedDepartment] = useState({});

    useEffect(() => {

        DepartmentService.getDepartment(id)
            .then(res => {
                setEditedDepartment(res.data);
                formData.name = res.data.name
                formData.description = res.data.description
            }).catch(error => console.error(error));

        DepartmentService.getDepartmentAddressId(id)
            .then(res => {
                AddressService.getAddress(res.data.address_id)
                    .then(response => {
                        setAddressId(response?.data?.id);
                        formData.apartment_number = response?.data?.apartment_number
                        formData.building_number = response?.data?.building_number
                        formData.street_name = response?.data?.street?.name
                        formData.country_name = response?.data?.street?.city?.voivodeship?.country?.name
                        formData.country_code = response?.data?.street?.city?.voivodeship?.country?.code
                        formData.voivodeship_name = response?.data?.street?.city?.voivodeship?.name
                        formData.voivodeship_code = response?.data?.street?.city?.voivodeship?.code
                        formData.city_name = response?.data?.street?.city?.name
                        setRerender(!rerender);

                    })

                    
            }).catch(error => console.error(error));
    }, [])


    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const editDepartmentHandler = async (e) => {

        e.preventDefault()

        setMessage("");
        setSuccessful(false)

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AddressService.addAddress(
                    {
                    country_name: formData.country_name,
                    country_code: formData.country_code,
                    voivodeship_name: formData.voivodeship_name,
                    city_name: formData.city_name,
                    street_name: formData.street_name,
                    building_number: formData.building_number,
                    apartment_number: formData.apartment_number,
                    voivodeship_code: formData.voivodeship_code
                    }
                ).then(res => {
                    console.log(res)
                    DepartmentService.editDepartment(editedDepartment.id, { name: formData.name, description: formData.description }, res.data).then( res => {
                        navigate("/departments", { state: { message: "Successfully edited department.", successful: true } })
                        window.location.reload();
                })
                    
                }).catch(error => {
                    setMessage(error.message);
                    setSuccessful(false);
                    console.log(error)
                })
        }
    }

    const handleCancel = () => {
        navigate("/departments");
    };
    const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


    return (
        <>
            <div className='flex flex-wrap justify-center content-center p-3'>
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
        <div className="flex flex-wrap justify-center min-h-screen content-center">
          <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
            <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj Wydział</h1>

            <Form onSubmit={editDepartmentHandler} ref={form} className="space-y-6">
              <hr />
              <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwa</label>
                <Input
                  type="text"
                  className={formStyle}
                  name="name"
                  placeholder="Nazwa"
                  value={formData.name}
                  onChange={onChange}
                  validations={[required, vname]} />
              </div>
              <div className="mb-6">
                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis</label>
                <Textarea
                  className={formStyle}
                  value={formData.description}
                  name="description"
                  rows="3"
                  placeholder="Opis"
                  onChange={onChange}
                  validations={[vdesc]}
                />
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

              <button onClick={handleCancel} className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 ">Wróć  </button>



              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
            </div>
        </>
    )
}

export default EditDepartment
