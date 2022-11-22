import React, { useState, useRef , useEffect} from 'react'
import { useStateContext } from '../services/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from 'react-validation/build/select';

import RoomService from '../services/room.service';
import AdressService from '../services/address.service';

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
          Nazwa może mieć maksymalnie 45 znaków.
        </div>
      );
    }
  };

  const vcap = (value) => {
    if (value > 999 || value < 1) {
      return (
        <div className="text-red-500 font-medium">
          Pojemność pokoju musi się znajdować pomiędzy 1 a 999.
        </div>
      );
    }
  };
  

const AddRoom = () => {

    const form = useRef();
    const checkBtn = useRef();
    const { screenSize } = useStateContext();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState();
    const [department, setDepartment] = useState( null)
    const [room_type, setRoom_type] = useState( null)
    const [addr, setAddr] = useState(undefined)
    const [deps, setDeps] = useState({})
    const [options, setOptions] = useState({})
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
      RoomService.getRoomTypes().then(
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
      AdressService.showAddress().then(
        (response) => {
          console.log(response.data)
          setAddr(response.data);
          
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
      RoomService.getDepartments().then(
        (response) => {
          console.log(response.data)
          setDeps(response.data);
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


    function getDepAddress(id){
      let address = "";
      if(addr !== undefined){
        for(const a of addr){
          if(a.id === id)
            address = a.building_number +" "+ a.street.name +"," + a.street.city.name ;
        }
      }
      return address;
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
      };
    
      const onChangeCapacity = (e) => {
        const capacity = e.target.value;
        setCapacity(capacity);
      };

      const onChangeRoom_type = (e) => {
        const Room_type = e.target.value;
        setRoom_type(Room_type);
      };
    
      const onChangeDepartment = (e) => {
        const department = e.target.value;
        setDepartment(department);
      };

    const addRoomHandler = async (e) => {

        e.preventDefault()

        setMessage("");
        setSuccessful(false)

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            RoomService.addRoom(name,parseInt(capacity), department,room_type).then(
                ()=> {
                    navigate("/rooms", { state: { message: "Successfully added room.", successful: true } })
                    window.location.reload();
                    setSuccessful(true);
                    setMessage("Successfuly added room.");

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
        navigate("/rooms");
    };
    return (
        <>
        <div className='flex flex-wrap justify-center min-h-screen content-center p-3'>
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
            <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj Pokój</h1>
            <hr />
            
              <Form onSubmit={addRoomHandler} ref={form} className="pt-4 flex-2 text-center">
                <Input  className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={name}
                    name="name"
                    placeholder="Nazwa"
                    onChange={onChangeName}
                    type="text"
                    validations={[required, vname]}
                  />
                <Input className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl "
                    value={capacity}
                    name="capacity"
                    type="number"
                    placeholder="Pojemność pokoju"
                    onChange={onChangeCapacity}
                    validations={[vcap, required]}
                    />
                <Select  className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl"
                  value={room_type || ''}
                  onChange={onChangeRoom_type}
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
              <Select  className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl"
                  value={department || ''}
                  onChange={onChangeDepartment}
                  validations={[required]}
                >
                  <option value = {null} >----</option>
                  {
                   deps.length > 0 &&
                   deps.map(d => (
                    <option value ={d.id} key={d.id}>{d.department.name} - {getDepAddress(d.address_id)}</option>
                   ))
                  }
              </Select>
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

export default AddRoom
