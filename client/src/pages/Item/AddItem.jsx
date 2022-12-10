import React, { useState, useRef, useEffect } from 'react'
import { useStateContext } from '../../services/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from 'react-validation/build/select'
import validator from 'validator';
import moment from "moment";
import 'moment-timezone';

import ItemService from '../../services/item.service'

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500 font-medium">
        This field is required!
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length > 45) {
    return (
      <div className="text-red-500 font-medium">
        Name of the item has to be under 45 characters.
      </div>
    );
  }
};

const vser = (value) => {
  if (value.length > 45) {
    return (
      <div className="text-red-500 font-medium">
        Serial nummber of the item has to be under 45 characters.
      </div>
    );
  }
};

const vdate = (value) => {
  if (!validator.isDate(value)) {
    return (
      <div className="text-red-500 font-medium">
        Value has to be a date.
      </div>
    );
  }
  else if (value > Date.now()) {
    return (
      <div className="text-red-500 font-medium">
        Date of possesion has to be in the past.
      </div>
    );
  }
};


const AddItem = () => {

  const form = useRef();
  const checkBtn = useRef();
  const { screenSize } = useStateContext();
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [serial_number, setSerial_number] = useState('');
  const [possesion_date, setPossesion_date] = useState(moment.tz('Europe/Warsaw').format('YYYY-MM-DD'))
  const [item_type, setItem_type] = useState(null)
  const [options, setOptions] = useState({})
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    ItemService.getItemTypes().then(
      (response) => {
        console.log(response.data)
        setOptions(response.data);
      },
      (error) => {
        const _error =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_error);
        setSuccessful(false);
      }
    );
  }, []);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeSerial_number = (e) => {
    const serial_number = e.target.value;
    setSerial_number(serial_number);
  };
  const onChangePossesion_date = (e) => {
    const possesion_date = e.target.value;
    setPossesion_date(possesion_date);
  };

  const onChangeItem_type = (e) => {
    const Item_type = e.target.value;
    setItem_type(Item_type);
  };


  const addItemHandler = async (e) => {

    e.preventDefault()

    setMessage("");
    setSuccessful(false)

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      ItemService.addItem(name, serial_number, possesion_date, item_type).then(
        () => {
          navigate("/items", { state: { message: "Successfully added item.", successful: true } })
          window.location.reload();
          setSuccessful(true);
          setMessage("Successfuly added item.");

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
    navigate("/items");
  };
  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
    <>
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
          <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj sprzęt</h1>

          <Form onSubmit={addItemHandler} ref={form} className="space-y-6">
            <hr />
            <div className="mb-6">
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwa</label>
              <Input
                type="text"
                className={formStyle}
                name="name"
                placeholder="Nazwa"
                value={name}
                onChange={onChangeName}
                validations={[required, vname]} />
            </div>
            <div className="mb-6">
              <label for="serial_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer seryjny</label>
              <Input
                type="text"
                className={formStyle}
                value={serial_number}
                name="serial_number"
                placeholder="Numer seryjny"
                onChange={onChangeSerial_number}
                validations={[vser, required]} />
            </div>
            <div className="mb-6">
              <label for="possesion_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data posesji</label>
              <Input
                type="date"
                className={formStyle}
                value={possesion_date}
                name="possesion_date"
                placeholder="Data posesji"
                onChange={onChangePossesion_date}
                validations={[vdate, required]} />
            </div>
            <div className="mb-6">
              <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Typ sprzętu</label>
              <Select
                type="text"
                className={formStyle}
                name="type"
                value={item_type || ''}
                onChange={onChangeItem_type}
                validations={[required]}>
                <option value={null} >----</option>
                {
                  options.length > 0 &&
                  options.map(opt => (
                    <option value={opt.id} key={opt.id}>{opt.name}</option>
                  ))
                }
              </Select>
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Zatwierdź</button>

            <button onClick={handleCancel} className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 ">Wróć  </button>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddItem
