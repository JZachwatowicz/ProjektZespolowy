import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../services/ContextProvider';
import Pagination from "../../components/Pagination.jsx";
import { useNavigate, useLocation } from 'react-router-dom';

import UserService from "../../services/user.service"
import AdressService from '../../services/address.service';
const ShowUsers = () => {

    const [users, setUsers] = useState([])
    const [addresses, setAddresses] = useState([])
    const [filterBy, setFilterBy] = useState("")
    const [filteredRooms, setFiltered] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRooms.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(filteredRooms.length / recordsPerPage);
    const navigate = useNavigate();
    const { screenSize } = useStateContext();
    const [search, setSearch] = useState('');

    const location = useLocation();
    const [message, setMessage] = useState(location.state ? location.state.message : "");
    const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);
    const roles = {
        1: "Użytkownik",
        2: "Pracownik",
        3: "Administrator"
    }
    // function HandleSearch() {
    //     if (search === "") {
    //         setFiltered(rooms);
    //         setCurrentPage(1);
    //     } else {
    //         setFiltered(rooms.filter(i => i.name.toLowerCase().includes(search.toLowerCase())));
    //         setCurrentPage(1);
    //     }
    // }


    // const onChangeSearch = (e) => {
    //     const search = e.target.value;
    //     setSearch(search);
    // };

    // const onChangeFilterBy = (e) => {
    //     const filter = e.target.value;
    //     setFilterBy(filter);
    //     if (filter === "All") {
    //         setFiltered(rooms);
    //         setCurrentPage(1);
    //     } else {
    //         setFiltered(rooms.filter(i => (i.department_has_address_id === parseInt(filter))));
    //         setCurrentPage(1);
    //     }
    // }
    const fetchData = () => {
        AdressService.showAddress()
            .then(res => {
                setAddresses(res.data)
            })
            .catch((error) => {
                console.log(error)
                setMessage(error);
                setSuccessful(false);
            });
        UserService.showUsers()
            .then(res => setUsers(res.data))
            .catch(error => {
                console.log(error)
                setMessage(error.message)
                setSuccessful(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleEditUser = (id) => {
        navigate('/users/edit/' + id)
    }
    const handleEditUserAddress = (id) => {
        navigate('/users/editaddress/' + id)
    }
    const handleAddUser = () => {
        navigate('/users/add')
    }

    const handleDeleteUser = (id) => {
        UserService.deleteUser(id)
            .catch(error => {
                setMessage(error.message);
                console.error(error);
            });
        setUsers(users.filter(e => e.id !== id))
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
    
            
    
            <div className="overflow-x-auto relative shadow-lg sm:rounded-lg border-1 w-fit">
    
              <table className="w-full text-left  rounded-lg" >
                <caption className="p-5 text-lg font-semibold text-center text-gray-900 bg-white dark:text-white dark:bg-secondary-dark-bg">
                <button onClick={() => handleAddUser()} 
                className="flex items-left p-3 shadow-xl rounded-lg  text-white bg-green-700 border border-green-700 hover:bg-green-800 ">
                Dodaj użytkownika
            </button>Użytkownicy
                </caption>
                <thead className="uppercase text-white bg-secondary-dark-bg dark:bg-slate-300 dark:text-black">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                    Nazwa użytkownika
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Imię i nazwisko
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Email
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Telefon
                    </th>
                    <th scope="col" className="py-3 px-4">
                    PESEL
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Data urodzenia
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Adres
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Rola
                    </th>
                    <th scope="col" className="py-3 px-4">
                    Akcje
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users ? users.map(user => (
                    
                    <tr key={user.id} className="bg-white border-b dark:bg-secondary-dark-bg dark:border-gray-700">
                      <td className="py-4 px-4">{user.username}</td>
                      <td className="py-4 px-4">{user.first_name + " " + user.last_name}</td>
                      <td className="py-4 px-4"> {user.email}</td>
                      <td className="py-4 px-4"> {user.contact_number}</td>
                      <td className="py-4 px-4"> {user.pesel}</td>
                      <td className="py-4 px-4"> {user.birth_date}</td>
                      {addresses.map((e, index) => {
                                    return (e.id === user.address_id ?
                                        <td className="py-4 px-4" key={index}>
                                            <table>
                                                <tbody>
                                                    <tr><td>{e.street.name} {e.building_number}{e.apartment_number !== "" ? '/' + e.apartment_number : null}</td></tr>
                                                    <tr><td>{e.street.city.voivodeship.name}, {e.street.city.name}</td></tr>
                                                    <tr><td>{e.street.city.voivodeship.country.name}</td></tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        :
                                        null
                                    )
                                })
                                }
                                {user.address_id ? null : <td className="py-4 px-4">brak</td>}
                                <td className="py-4 px-4">{roles[user.role_id]}</td>                      <td className="py-4 px-4 flex">
                        <button className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black " onClick={() => handleEditUserAddress(user.id)}>EditAddress</button>
                        <button className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black " onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 ">
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

export default ShowUsers
