import React, { useState, useRef , useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../services/ContextProvider';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from 'react-validation/build/select';

import RoomService from '../../services/room.service';
import AdressService from '../../services/address.service';

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
    if (value > 1000 || value < 1) {
      return (
        <div className="text-red-500 font-medium">
          Pojemność pokoju musi się znajdować pomiędzy 1 a 999.
        </div>
      );
    }
  };
  
  

const EditRoom = () => {


    let { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const { screenSize } = useStateContext();
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
      RoomService.getRoom(id).then(
        (response) => {
          console.log(response.data);
          setName(response.data.name);
          setCapacity(response.data.capacity);
          setRoom_type(response.data.room_type_id);
          setDepartment(response.data.department_has_address_id);
        },
        (error) => {
          const _error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setMessage(_error);
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
    

    const EditRoomHandler = async (e) => {

        e.preventDefault()

        setMessage("");
        setSuccessful(false)


        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            RoomService.editRoom(id,name,parseInt(capacity),department,room_type).then(
                ()=> {
                  navigate('/rooms', { state: { message: "Successfully edited room.", successful: true } });

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
          <h1 className="mb-8 text-center text-3xl  font-semibold">Edytuj pokój</h1>

          <Form onSubmit={EditRoomHandler} ref={form} className="space-y-6">
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
              <label for="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pojemność</label>
              <Input
                type="text"
                className={formStyle}
                name="capacity"
                placeholder="Pojemność pokoju"
                value={capacity}
                onChange={onChangeCapacity}
                validations={[vcap, required]} />
            </div>
            <div className="mb-6">
              <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Typ pokoju</label>
              <Select
                type="text"
                className={formStyle}
                name="type"
                value={room_type || ''}
                onChange={onChangeRoom_type}
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
            <div className="mb-6">
              <label for="dep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wydział</label>
              <Select
                type="text"
                className={formStyle}
                name="dep"
                value={department || ''}
                onChange={onChangeDepartment}
                validations={[required]}
              >
                <option value={null} >----</option>
                {
                  deps.length > 0 &&
                  deps.map(d => (
                    <option value={d.id} key={d.id}>{d.department.name} - {getDepAddress(d.address_id)}</option>
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

export default EditRoom
