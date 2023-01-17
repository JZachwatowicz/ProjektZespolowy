import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import DescriptionService from "../../services/description.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Moment from 'moment';

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

  console.log(descriptions)
  return (

    <div className="overflow-x-auto relative shadow-lg sm:rounded-lg w-10/12 border-1">

      <table className="w-full text-left  rounded-lg" >
        <caption className="p-5 text-lg font-semibold text-center text-gray-900 bg-white dark:text-white dark:bg-secondary-dark-bg">
          Moje Wpisy
        </caption>
        <thead className="uppercase text-white bg-secondary-dark-bg dark:bg-slate-300 dark:text-black">
          <tr>
            <th scope="col" className="py-3 px-6">
              Data dodania
            </th>
            <th scope="col" className="py-3 px-6">
              Autor
            </th>
            <th scope="col" className="py-3 px-6">
              Tytuł
            </th>
            <th scope="col" className="py-3 px-6">
              Akcja
            </th>
          </tr>
        </thead>
        <tbody>
          {descriptions ? descriptions.map(e => (
            <tr key={e.id} className="bg-white border-b dark:bg-secondary-dark-bg dark:border-gray-700">
              <td className="py-4 px-6">{Moment(e.createdAt).format('DD-MM-YYYY')}</td>
              <td className="py-4 px-6"> <>{users.find(user => user.id === parseInt(e.author)) ? users.find(user => user.id === parseInt(e.author)).username : null}</></td>
              <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {e.title}</td>
              <td className="py-4 px-6"><button className="p-3 shadow-xl m-1 rounded-lg  bg-green-700 text-white hover:bg-gray-400 hover:text-black " onClick={() => navigate("/descriptions/" + e.id)}>Szczegóły</button></td>

            </tr>
          ))
        : null}
        </tbody>
      </table>
    </div>
  );
}

export default ShowUserDescription;
