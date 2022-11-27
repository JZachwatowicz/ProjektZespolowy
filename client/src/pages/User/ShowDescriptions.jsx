import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../services/ContextProvider';
import Pagination from "../../components/Pagination.jsx";
import { useNavigate, useLocation } from 'react-router-dom';

import DescriptionService from "../../services/description.service";
import UserService from "../../services/user.service";

const ShowDescriptions = () => {

  const navigate = useNavigate();

  const [descriptions, setDescriptions] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    UserService.showUsers()
      .then(response => {
        setUsers(response.data)
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      });
    DescriptionService.get_all_descriptions()
      .then(res => setDescriptions(res.data))
      .catch(error => {
        console.log(error)
        setMessage(error.message)
      });
  }, []);


  const handleAddDescription = () => {
    navigate("/employee/descriptions/add");
  }



  const handleDeleteDescription = (id) => {
    DescriptionService.delete_description(id)
      .catch(error => {
        setMessage(error.message);
        console.error(error);
      });
    setDescriptions(descriptions.filter(e => e.id !== id))
  }

  return (
    <div className='flex gap-10 flex-wrap justify-center'>
      <div className="p-11 mb-20 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Wpisy</h1>
        {message && (
          <div
            className={
              "m-2 text-red-500 font-medium"
            }
            role="alert"
          >
            {message}
          </div>
        )}


        <button onClick={() => handleAddDescription()} className="flex text-center items-center p-3 shadow-xl m-1 rounded-lg  text-white bg-green-700 border border-green-700 hover:bg-green-800 ">
          +
        </button>
        {descriptions.map(i => (
          <div className="flex flex-2 justify-evenly border-2 rounded-lg p-3 pt-6 pb-6 shadow-md m-2 bg-white dark:bg-secondary-dark-bg dark:border-gray-700" key={i.id}>
            <div className="col-span-2 break-all flex items-center p-1">{i.name}</div>
            <div className=" flex flex-col p-1 items-center break-words "><b>Tytuł:</b> <>{i.title}</></div>
            <div className=" flex flex-col p-1 items-center break-words "><b>Opis:</b> <>{i.description}</></div>
            <div className=" flex flex-col p-1 items-center break-words"><b>Autor:</b> <>{users.find(user => user.id === parseInt(i.author)) ? users.find(user => user.id === parseInt(i.author)).username : null}</></div>
            <div className=" flex flex-col p-1 items-center break-words"><b>Pacjent:</b> <>{users.find(user => user.id === i.user_id) ? users.find(user => user.id === i.user_id).first_name + " " +users.find(user => user.id === i.user_id).last_name : null}</></div>
            <div className=" flex justify-end items-center pr-2">
              <button onClick={() => handleDeleteDescription(i.id)} className="flex text-center items-center p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>
              </button>
            </div>
          </div>
        ))
        }

      </div>
    </div>
  );
}

export default ShowDescriptions
