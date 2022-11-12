import React, { useState, useRef, useEffect} from 'react'
import {
    useParams
  } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";

import CheckButton from "react-validation/build/button"

import ActivityService from '../services/activity.service'

const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };
  
  const vname = (value) => {
    if (value.length > 100) {
      return (
        <div className="invalid-feedback d-block">
          Name of the activity has to be under 100 characters.
        </div>
      );
    }
  };
  const vdesc = (value) => {
    if ( value.length > 250) {
      return (
        <div className="invalid-feedback d-block">
          Description of the activity has to be under 250 characters.
        </div>
      );
    }
  };

  


const EditActivity = ({ history }) => {

    let { id } = useParams();
    const form = useRef();
    const checkBtn = useRef();
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
                    history.push('/activities');
                    window.location.reload();

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



    return (
        <>
            <div className='container mt-5 p-2 col-md-12'>
                <h1>Edit Activity</h1>
                <hr />

                <Form onSubmit={EditActivityHandler} ref={form}>
                {!successful && (
                    <div>
                    <div className="form-group mb-3">
                        <label htmlFor='name'>Name</label>
                        <Input  className="w-100"
                            value={name}
                            onChange={onChangeName}
                            type="text"
                            validations={[required, vname]}
                          />
                    </div>

                  
                    <div className="form-group mb-3" >
                        <label htmlFor='description'>Description</label>
                        <Textarea className="w-100"
                            value={description}
                            
                            onChange={onChangeDescription}
                            validations={[vdesc]}
                            />
                    </div>


                    <button  className='btn btn-primary' type="submit">
                        Edit Activity
                    </button>
                    </div>
                    )}
                    { successful === false && message && (
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
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </>
    )
}

export default EditActivity
