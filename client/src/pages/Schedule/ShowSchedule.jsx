import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useStateContext } from '../../services/ContextProvider';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from 'react-validation/build/select';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import UserService from '../../services/user.service';
import RoomService from '../../services/room.service';
import ActivityService from '../../services/activity.service';
//CRUD + odczywytanie w tabeli

const ShowSchedule = () => {
    let { h_id, s_id } = useParams();
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const { screenSize } = useStateContext();
    const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();


    const [schedule, setSchedule] = useState([])
    const [users, setUsers] = useState([])
    const [harmonogram, setHarmonogram] = useState([])
    const [patients, setPatients] = useState([])
    const [rooms, setRooms] = useState([])
    const [activities, setActivities] = useState([])
    const location = useLocation();
    const [message, setMessage] = useState(location.state ? location.state.message : "");
    const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

    const [begin_date, setBeginDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [room_id, setRoomId] = useState('');
    const [activity_id, setActivityId] = useState('');

    const fetchHarmonogram = () => {
        HarmonogramService.getHarmonogram(h_id)
            .then(response => {
                console.log(response.data);
                setHarmonogram(response.data);
                setBeginDate(parseDate(response.data.begin_date));
                setEndDate(parseDate(response.data.end_date));
                setRoomId(response.data.room_id);
            })
            .catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    const fetchSchedule = () => {
        ScheduleService.getSchedule(s_id)
            .then(response => {
                console.log(response.data);
                setSchedule(response.data);
                setActivityId(response.data.activity_id);
            })
            .catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    const fetchRoom = () => {
        RoomService.showRooms()
            .then(response => {
                setRooms(response.data.map(e => { return { id: e.id, name: e.name } }));
            })
            .catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    const fetchActivity = () => {
        ActivityService.showActivities()
            .then(response => {
                setActivities(response.data.map(e => { return { id: e.id, name: e.name, description: e.description } }));
            })
            .catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    const fetchUser = () => {
        UserService.showUsers()
            .then(response => {
                setUsers(response.data.map(e => { return { id: e.id, first_name: e.first_name, last_name: e.last_name } }))
            }).catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    useEffect(() => {
        fetchHarmonogram();
        fetchSchedule();
        fetchRoom();
        fetchActivity();
        fetchUser();

        var usersSchedule = [];
        ScheduleService.getScheduleUsers(s_id).then(res => {
            res.data.forEach(us => {
                usersSchedule.push(us.user_id);
            })
            setPatients(usersSchedule);
        });
    }, []);

    function parseDate(date) {
        console.log(date);
        var parsed = date.split(/[T.]/);
        parsed = parsed[0] + " " + parsed[1];
        return parsed;
    }

    function getActivityId(h_id) {
        if (schedule.harmonogram_id === h_id) {
            return schedule.activity_id;
        }
        return null;
    }

    const goBackHandler = () => {
        navigate("/schedule");
    }

    return (
        <div>
            Szczegóły zajęć
            <button onClick={() => goBackHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                Powrót
            </button>
            <table className='w-full text-center'>
                <tbody>
                    <tr>
                        <td>Data rozpoczęcia:</td>
                        <td>{begin_date}</td>
                    </tr>
                    <tr>
                        <td>Data zakończenia: </td>
                        <td>{end_date}</td>
                    </tr>
                    <tr>
                        <td>Prowadzący: </td>
                        <td>
                            {
                                users.find(user => user.id === harmonogram.user_id) ?
                                    users.find(user => user.id === harmonogram.user_id).first_name + " " + users.find(user => user.id === harmonogram.user_id).last_name :
                                    "brak"
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Numer pokoju: </td>
                        <td>
                            {
                                rooms.find(room => room.id === harmonogram.room_id) ?
                                    rooms.find(room => room.id === harmonogram.room_id).name :
                                    "brak"
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Adres: </td>
                        <td>
                            {
                                rooms.find(room => room.id === harmonogram.room_id) ?
                                    rooms.find(room => room.id === harmonogram.room_id).name :
                                    "brak"
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Nazwa zajęć: </td>
                        <td>
                            {
                                activities.find(activity => activity.id === getActivityId(harmonogram.id)) ?
                                    activities.find(activity => activity.id === getActivityId(harmonogram.id)).name :
                                    "brak"
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Opis zajęć: </td>
                        <td>
                            {
                                activities.find(activity => activity.id === getActivityId(harmonogram.id)) ?
                                    activities.find(activity => activity.id === getActivityId(harmonogram.id)).description :
                                    "brak"
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Lista pacjentów: </td>
                        <td>
                            {patients.map(p =>
                                <li>
                                    {
                                        users.find(user => user.id === p) ?
                                            users.find(user => user.id === p).first_name + " " + users.find(user => user.id === p).last_name :
                                            "brak"
                                    }
                                </li>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ShowSchedule
