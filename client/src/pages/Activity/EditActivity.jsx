import React, { useState, useRef, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../services/ContextProvider';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import ActivityService from '../../services/activity.service';

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
          Opis aktywności nie może przekraczać 100 znaków.
        </div>
      );
    }
  };

  


const EditActivity = () => {

    let { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();
    const { screenSize } = useStateContext();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
      ActivityService.getActivity(id).then(
        (response) => {
          console.log(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
        },
        (error) => {
          const _error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setMessage(_error);
        }
      );
    },[id]);

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
      };
    
      const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
      };
    

    const EditActivityHandler = async (e) => {

        e.preventDefault()

        setMessage("");
        setSuccessful(false)
        
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            ActivityService.editActivity(id,name,description).then(
                ()=> {
                    navigate('/activities', { state: { message: "Successfully edited activity.", successful: true } });

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
          <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj Wydział</h1>

          <Form onSubmit={EditActivityHandler} ref={form} className="space-y-6">
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
              <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis</label>
              <Textarea
                className={formStyle}
                value={description}
                name="description"
                rows="3"
                placeholder="Opis"
                onChange={onChangeDescription}
                validations={[vdesc]}
              />
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Zatwierdź</button>
            <button onClick={handleCancel} className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 ">Wróć</button>


            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditActivity
