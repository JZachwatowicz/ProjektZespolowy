import React, { useState, useRef } from 'react'
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
  
  

const AddActivity = ({ history }) => {

    const form = useRef();
    const checkBtn = useRef();
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
                <h1>Add Activity</h1>
                <hr />

                <Form onSubmit={addActivityHandler} ref={form}>
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
                        Add Activity
                    </button>
                    </div>
                    )}
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
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </>
    )
}

export default AddActivity
