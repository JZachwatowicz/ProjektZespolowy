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
        1: "user",
        2: "pracownik",
        3: "admin"
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
        navigate('/admin/edit/' + id)
    }
    const handleEditUserAddress = (id) => {
        navigate('/admin/editaddress/' + id)
    }
    const handleAddUser = () => {
        navigate('/admin/add')
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
            <button onClick={() => handleAddUser()}>Dodaj użytkownika</button>
            <table>
                <tbody>
                    <tr><th>Nazwa użytkownika</th><th>Imię i nazwisko</th><th>Email</th><th>Telefon</th><th>PESEL</th><th>Data urodzenia</th><th>Adres</th></tr>
                    {users.map((user, index) => {
                        return (

                            <tr key={index}>
                                <td>{user.username}</td><td>{user.first_name + " " + user.last_name}</td>
                                <td>{user.email}</td><td>{user.contact_number}</td>
                                <td>{user.pesel}</td><td>{user.birth_date}</td>
                                {addresses.map((e, index) => {
                                    return (e.id === user.address_id ?
                                        <td key={index}>
                                            <table>
                                                <tbody>
                                                    <tr><td>{e.street.name} {e.building_number}{e.apartment_number !== "" ? '/' + e.apartment_number : null}</td></tr>
                                                    <tr><td>{e.street.city.name}</td></tr>
                                                    <tr><td>woj.{e.street.city.voivodeship.name}</td></tr>
                                                    <tr><td>{e.street.city.voivodeship.country.name}</td></tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        :
                                        null
                                    )
                                })
                                }
                                {user.address_id ? null : <td>brak</td>}
                                <td>{roles[user.role_id]}</td>
                                <td><button onClick={() => handleEditUserAddress(user.id)}>EditAddress</button></td>
                                <td><button onClick={() => handleEditUser(user.id)}>Edit</button></td>
                                <td><button onClick={() => handleDeleteUser(user.id)}>X</button></td>
                            </tr>


                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default ShowUsers
