import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ActivityService from "../services/activity.service.js";

  const ShowActivities = ({ history }) => {
  const [activities, setActivities] = useState([])
  const [message, setMessage] = useState("")
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
      ActivityService.showActivities().then(
        (response) => {
          console.log(response.data)
          setActivities(response.data);
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
    function deleteActivityHandler(id) {
      setMessage("");
      setSuccessful(false);
      
      
      ActivityService.deleteActivity(id).then(
          ()=> {
              setSuccessful(true);
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
    return (
        <div className="container  pt-4 list-group" >
            <h3 className="text-center">List of activities</h3> 
            { message.length === 0 && 
              activities.length > 0 &&
              activities.map(act => (
                <div className="list-group-item container" key={act.id}>
                  <div className='row w-100'>
                  <div className="col-4">{act.name}</div>
                  <div className="col-7">{act.description}</div>
                  <div className="col-1 d-flex justify-content-between">
                  <Link to={"/EditActivity/"+act.id} className="btn btn-secondary me-2">
                       Edit
                    </Link>
                      <button onClick={() => deleteActivityHandler(act.id)} className="btn btn-danger" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
              ))}
              {
                activities.length === 0 &&
                <h4> There are no activities to display.</h4>

              }
              { message && (
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
            
        </div>
      );
}

export default ShowActivities
