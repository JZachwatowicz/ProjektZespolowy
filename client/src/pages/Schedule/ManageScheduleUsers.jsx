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

const required = (value) => {
    if (!value) {
        return (
            <div className="text-red-500 font-medium">
                To pole jest wymagane!
            </div>
        );
    }
};

const EditSchedule = () => {
    let { h_id, s_id, r_size } = useParams();

    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const { screenSize } = useStateContext();
    const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();


    const [schedule, setSchedule] = useState([])
    const [users, setUsers] = useState([])
    const [harmonogram, setHarmonogram] = useState([])

    const location = useLocation();
    const [message, setMessage] = useState(location.state ? location.state.message : "");
    const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

    const [total, setTotal] = useState(0);
    const [checkedState, setCheckedState] = useState();

    const fetchHarmonograms = () => {
        HarmonogramService.getHarmonogram(h_id)
            .then(response => {
                setHarmonogram(response.data);
            })
            .catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    const fetchSchedule = () => {
        ScheduleService.getSchedule(s_id)
            .then(response => {
                setSchedule(response.data);
            })
            .catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    const fetchUsers = () => {
        UserService.showUsers()
            .then(response => {
                setUsers(response.data);

                var newCheckedState = new Array(response.data.length).fill(false);
                ScheduleService.getScheduleUsers(s_id).then(res => {
                    for(var i=0; i<response.data.length; i++) {
                        res.data.forEach(element => {
                            if(response.data[i].id === element.user_id){
                                newCheckedState[i] = true;
                            }
                        })
                    }
                });

                setCheckedState(newCheckedState);
            }).catch(error => {
                console.error(error)
                setMessage(error.message);
            });
    }

    useEffect(() => {
        fetchHarmonograms();
        fetchSchedule();
        fetchUsers();
    }, []);

    const handleCancel = () => {
        navigate("/schedule")
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const totalUsers = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    sum++
                }
                return sum;
            },
            0
        );

        setTotal(totalUsers);
    };

    const manageUsersHandler = async (e) => {
        e.preventDefault()

        setMessage("");
        setSuccessful(false)

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            var data = [];
            for (var i = 0; i < users.length; i++) {
                if (checkedState[i]) {
                    data.push(users[i])
                }
            }

            if(data.length <= r_size){
                await ScheduleService.addUserSchedule(s_id, data)
                    .then(() => {
                        navigate("/schedule")
                    }).catch(error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setMessage(resMessage);
                        setSuccessful(false);
                    });
            } else {
                setMessage("Zbyt mała sala, zmniejsz liczbę pacjentów");
                setSuccessful(false);
            }
        }
    }

    return (
        <div>
            <div className='flex flex-wrap justify-center min-h-screen content-center p-3'>
                {message && (
                    <div className="form-group">
                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className={`p-11 shadow-2xl mb-20  ${screenSize <= 800 ? 'w-full' : 'w-10/12'}`}>
                    <h1 className="mb-8 text-center text-3xl  font-semibold">Dodaj użytkowników do zajęć</h1>
                    <Form onSubmit={manageUsersHandler} ref={form} className="pt-4 flex-2 text-center">
                        {users.map(({ username, first_name, last_name }, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={`custom-checkbox-${index}`}>{first_name + " " + last_name}</label>
                                    <Input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={username}
                                        value={username}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    {console.log(checkedState[index])}
                                </div>
                            )
                        }
                        )}
                        <div>
                            Dodano {total} / {r_size} pacjentów
                        </div>
                        <div className='m-auto'>
                            <button className='p-4 shadow-xl m-2 rounded-lg bg- border-1 bg-gray-600 text-white hover:bg-gray-400 hover:text-black' type="submit">
                                Aktualizuj
                            </button>
                            <button className='p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-400 hover:text-white' type="Reset" onClick={handleCancel}>
                                Anuluj
                            </button>
                        </div>

                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditSchedule
