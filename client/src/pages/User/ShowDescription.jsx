import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import DescriptionService from '../../services/description.service'
import { useStateContext } from '../../services/ContextProvider';
import UserService from '../../services/user.service';
import Moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const ShowDescription = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [description, setDescription] = useState()
    const [users, setUsers] = useState([])
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        UserService.showUsers()
            .then(response => {
                setUsers(response.data)
            }).catch(error => {
                console.error(error)
            })
        DescriptionService.get_one_description(id)
            .then(response => {
                setDescription(response.data);
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    console.log(currentUser)


    return (
        <div>
            {description && (description.user_id === currentUser.id || currentUser.roles.includes("ROLE_EMPLOYEE") || currentUser.roles.includes("ROLE_ADMIN")) ?

                <div className="flex flex-wrap justify-center min-h-screen content-center">

                    <div className="flex-1 gap-y-4 w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
                        <h1 className="mb-4 flex justify-between items-center text-4xl font-extrabold tracking-tight leading-none">

                            <button className='p-4 shadow-xl  text-2xl m-2 rounded-lg border-1 hover:bg-gray-400 hover:text-white' onClick={() => navigate("/news")}>Wróć</button>
                            {description.title}
                        </h1>
                        <h3 className="mb-4 flex justify-between items-center text-2xl font-extrabold tracking-tight leading-none">
                            <p>
                                {currentUser.id !== description.user_id ?
                                    <>
                                        Pacjent: {users.find(user => user.id === description.user_id) ? users.find(user => user.id === description.user_id).first_name + " " + users.find(user => user.id === description.user_id).last_name : null}
                                    </>
                                    : null}
                            </p>
                            <p>
                                Autor: {users.find(user => user.id === parseInt(description.author)) ? users.find(user => user.id === parseInt(description.author)).username : null}
                            </p>
                        </h3>

                        <div className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-main-dark-bg dark:border-gray-700">
                            <div className='text-end text-xs'>{"Dodane: " + Moment(description.createdAt).format('DD-MM-YYYY')}</div>
                            <p className='mb-3 font-light'>{description.description}</p>
                        </div>
                    </div>
                </div>
                : "brak"}
        </div>
    )
}

export default ShowDescription
