import React, { useState, useRef , useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../services/ContextProvider';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from 'react-validation/build/select'
import validator from 'validator';
import moment from "moment";
import 'moment-timezone';

import ItemService from '../services/item.service'

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
    if ( !validator.isDate(value)) {
        return (
          <div className="itext-red-500 font-medium">
            Value has to be a date.
          </div>
        );
      }
      else if ( value > Date.now()) {
        return (
          <div className="text-red-500 font-medium">
            Date of possesion has to be in the past.
          </div>
        );
      }
  };
  

const EditItem = () => {


    let { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const { screenSize } = useStateContext();
    const [name, setName] = useState('')
    const [serial_number, setSerial_number] = useState('');
    const [possesion_date, setPossesion_date] = useState(moment.tz('Europe/Warsaw').format('YYYY-MM-DD'))
    const [item_type, setItem_type] = useState( null)
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
        }
      );
      ItemService.getItem(id).then(
        (response) => {
          console.log(response.data);
          setName(response.data.name);
          setSerial_number(response.data.serial_number);
          setPossesion_date(response.data.possesion_date);
          setItem_type(response.data.item_type_id);
        },
        (error) => {
          const _error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setMessage(_error);
        }
      );
    }, [id]);

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
    

    const EditItemHandler = async (e) => {

        e.preventDefault()

        setMessage("");
        setSuccessful(false)


        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            ItemService.editItem(id,name,serial_number,possesion_date, item_type).then(
                ()=> {
                  navigate('/items', { state: { message: "Successfully edited item.", successful: true } });

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


    return (
      <>
        <div className='flex flex-wrap justify-center min-h-screen content-center p-3'>
          {message && successful === false && (
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
            <h1 className="mb-8 text-center text-3xl font-semibold">Edytuj Aktywność</h1>
            <hr />

            <Form onSubmit={EditItemHandler} ref={form} className="pt-4 flex-2 text-center">
              <Input  className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                value={name}
                name="name"
                placeholder="Nazwa"
                onChange={onChangeName}
                type="text"
                validations={[required, vname]}
              />
              <Input className="form-control p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl "
                value={serial_number}
                name="serial_number"
                placeholder="Numer seryjny"
                onChange={onChangeSerial_number}
                validations={[vser, required]}
              />
              <Input className="form-control p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl "
                value={possesion_date}
                name="possesion_date"
                placeholder="Data posesji"
                type="date"
                onChange={onChangePossesion_date}
                validations={[vdate, required]}
              />
              <Select  className="form-control p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl"
                  value={item_type || ''}
                  onChange={onChangeItem_type}
                  validations={[required]}
                >
                  <option value = {null} >----</option>
                  {
                   options.length > 0 &&
                   options.map(opt => (
                    <option value = {opt.id} key={opt.id}>{opt.name}</option>
                   ))
                  }
              </Select>
              <div className='m-auto'>
                <button  className='p-4 shadow-xl m-2 rounded-lg bg- border-1 bg-gray-600 text-white hover:bg-gray-400 hover:text-black'    type="submit">
                    Zatwierdź
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

export default EditItem
