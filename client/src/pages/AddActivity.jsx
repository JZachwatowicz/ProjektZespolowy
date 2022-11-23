import React, { useState, useRef } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import { useNavigate } from 'react-router-dom';
import ActivityService from '../services/activity.service'
import { useStateContext } from '../services/ContextProvider';

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
    if (value.length > 100) {
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
  
  

const AddActivity = ({ history }) => {

    const form = useRef();
    const checkBtn = useRef();
    const { screenSize } = useStateContext();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

  

  const onChangeName = (e) => {
      const name = e.target.value;
      setName(name);
    };
  
    const onChangeDescription = (e) => {
      const description = e.target.value;
      setDescription(description);
    };
  

  const addActivityHandler = async (e) => {

      e.preventDefault()

      setMessage("");
      setSuccessful(false)


      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
          ActivityService.addActivity(name,description).then(
              ()=> {
                  navigate("/activities", { state: { message: "Successfully added activity.", successful: true } })
                  window.location.reload();
                  setSuccessful(true);
                  setMessage("Successfuly added activity.");
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
      navigate("/activities");
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
            <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj Aktywność</h1>
            <hr />
            
              <Form onSubmit={addActivityHandler} ref={form} className="pt-4 flex-2 text-center">
                <Input  className="form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={name}
                    name="name"
                    placeholder="Nazwa"
                    onChange={onChangeName}
                    type="text"
                    validations={[required, vname]}
                  />
                <Textarea className="form-control p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl "
                    value={description}
                    name="description"
                    rows="3"
                    placeholder="Opis"
                    onChange={onChangeDescription}
                    validations={[vdesc]}
                    />
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

export default AddActivity
