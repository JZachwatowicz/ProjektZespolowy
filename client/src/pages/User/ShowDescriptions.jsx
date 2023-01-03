import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../services/ContextProvider';
import Pagination from "../../components/Pagination.jsx";
import { useNavigate, useLocation } from 'react-router-dom';

import DescriptionService from "../../services/description.service";
import UserService from "../../services/user.service";
import Moment from 'moment';

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
    navigate("/descriptions/add");
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
    <div className="flex flex-wrap justify-center min-h-screen content-center">

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

        

        <div className="overflow-x-auto relative shadow-lg sm:rounded-lg border-1 w-10/12">

          <table className="w-full text-left  rounded-lg" >
            <caption className="p-5 text-lg font-semibold text-center text-gray-900 bg-white dark:text-white dark:bg-secondary-dark-bg">
            <button onClick={() => handleAddDescription()} className="flex items-left p-3 shadow-xl rounded-lg  text-white bg-green-700 border border-green-700 hover:bg-green-800 ">
          Dodaj wpis
        </button>Wpisy użytkowników
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
                  Pacjent
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
                  <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {users.find(user => user.id === e.user_id) ? users.find(user => user.id === e.user_id).first_name + " " + users.find(user => user.id === e.user_id).last_name : null}</td>
                  <td className="py-4 px-6 flex items-center">
                    <button className="p-3 shadow-xl m-1 rounded-lg  bg-green-700 text-white hover:bg-gray-400 hover:text-black " onClick={() => navigate("/descriptions/" + e.id)}>Szczegóły</button>
                    <button onClick={() => handleDeleteDescription(e.id)} className="p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>
                    </button>
                  </td>

                </tr>
              ))
                : null}
            </tbody>
          </table>
        </div>

      </div>
  );
}

export default ShowDescriptions
