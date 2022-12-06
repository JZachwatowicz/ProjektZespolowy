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
                <div className={`p-11 shadow-2xl mb-20  ${screenSize <= 800 ? 'w-full' : 'w-10/12'}`}>
                    <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj Wydział</h1>
                    <hr />

                    <Form onSubmit={editDepartmentHandler} ref={form} className="pt-4 flex-2 text-center text-black">
                        <Input className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
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
                        <Input className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                            value={formData.apartment_number}
                            name="apartment_number"
                            placeholder="Nr mieszkania"
                            onChange={onChange}
                            type="text"
                            validations={[required]}
                        />
                        <Input className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                            value={formData.building_number}
                            name="building_number"
                            placeholder="Numer budynku"
                            onChange={onChange}
                            type="text"
                            validations={[required]}
                        />
                        <Input className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                            value={formData.street_name}
                            name="street_name"
                            placeholder="Ulica"
                            onChange={onChange}
                            type="text"
                            validations={[required]}
                        />
                        <select name="country_code" value={formData.country_code} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">

                            {Country.getAllCountries().map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                        </select>

                        {formData.country_code ?
                            <input hidden type="text" onChange={onChange} name={formData.country_name} value={formData.country_name = Country.getCountryByCode(formData.country_code).name} />
                            : null}
                        {State.getStatesOfCountry(formData.country_code).length !== 0 ?

                            <>
                                <select name="voivodeship_code" value={formData.voivodeship_code} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">
                                    {State.getStatesOfCountry(formData.country_code).map(e => <option key={e.isoCode} value={e.isoCode}>{e.name}</option>)}
                                </select>
                                {formData.voivodeship_code ?
                                    <input hidden type="text" onChange={onChange} name={formData.voivodeship_name} value={formData.voivodeship_name = State.getStateByCode(formData.voivodeship_code).name} />
                                    : null}
                            </>
                            :
                            <>
                                    {City.getCitiesOfCountry(formData.country_code).length !== 0 ?
                            <>
                            <select name="city_name" value={formData.city_name} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">
                                {City.getCitiesOfCountry(formData.country_code).map(e => <option key={e.name} value={e.isoCode}>{e.name}</option>)}
                            </select>
                            </>
                            : null}
                        </>}
                        {City.getCitiesOfState(formData.country_code, formData.voivodeship_code).length !== 0 ?
                        <>
                        <select name="city_name" value={formData.city_name} onChange={onChange} className="form-control p-3 m-2 border-b-2 shadow-md">
                            {City.getCitiesOfState(formData.country_code, formData.voivodeship_code).map(e => <option key={e.name} value={e.isoCode}>{e.name}</option>)}
                        </select>
                        </>
                        : null}
                        <div className='m-auto'>
                            <button className='p-4 shadow-xl m-2 rounded-lg bg- border-1 bg-gray-600 text-white hover:bg-gray-400 hover:text-black' type="submit">
                                Dodaj
                            </button>
                            <button className='p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-400 hover:text-white' type="Reset" onClick={handleCancel}>
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

export default EditDepartment
