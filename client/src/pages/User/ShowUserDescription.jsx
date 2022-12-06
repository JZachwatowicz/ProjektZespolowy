import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import DescriptionService from "../../services/description.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

const ShowUserDescription = () => {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();

  const [descriptions, setDescriptions] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    UserService.showUsers()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, username: e.username } }))
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      });
    DescriptionService.get_user_descriptions(currentUser.id)
      .then(res => setDescriptions(res.data))
      .catch(error => {
        console.log(error)
        setMessage(error.message)
      });
  }, []);


  return (
    <div className='flex gap-10 flex-wrap justify-center'>
      <div className="p-11 mb-20 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Wpisy</h1>
        {

          descriptions.map(i => (
            <div className="flex flex-2 justify-evenly border-2 rounded-lg p-3 pt-6 pb-6 shadow-md m-2 bg-white dark:bg-secondary-dark-bg dark:border-gray-700" key={i.id}>
              <div className="col-span-2 break-all flex items-center p-1">{i.name}</div>
              <div className=" flex flex-col p-1 items-center break-words "><b>Tytuł:</b> <>{i.title}</></div>
              <div className=" flex flex-col p-1 items-center break-words "><b>Opis:</b> <>{i.description}</></div>
              <div className=" flex flex-col p-1 items-center break-words"><b>Autor:</b> <>{users.find(user => user.id === parseInt(i.author)) ? users.find(user => user.id === parseInt(i.author)).username : null}</></div>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default ShowUserDescription;
