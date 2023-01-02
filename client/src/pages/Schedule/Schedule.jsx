import React, { useState, useEffect } from 'react'
//import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
//import Textarea from "react-validation/build/textarea";
//import CheckButton from "react-validation/build/button"
import { useStateContext } from '../../services/ContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';
//import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import UserService from '../../services/user.service';
import RoomService from '../../services/room.service';
import ActivityService from '../../services/activity.service';
import AuthService from '../../services/auth.service';
//CRUD + odczywytanie w tabeli


const Schedule = () => {
  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([])
  const [users, setUsers] = useState([])
  const [patients, setPatients] = useState([])
  const [harmonograms, setHarmonograms] = useState([])
  const [rooms, setRooms] = useState([])
  const [activities, setActivities] = useState([])
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

  function checkIfBelong(h, h_id) {
    if(currentUser.roles[0] === "ROLE_ADMIN"){
      return true;
    }
    if (h.find(harmonogram => harmonogram.id === h_id)) {
      if (h.find(harmonogram => harmonogram.id === h_id).user_id === currentUser.id) {
        return true;
      }

      ScheduleService.getScheduleUsers(getScheduleId(h_id)).then(res => {
        res.data.forEach(us => {
          if (us.schedule_id === getScheduleId(h_id) && us.user_id === currentUser.id) {
            console.log(us.schedule_id + ": " + us.user_id);
            return true;
          }
        })
      });
    }

    return false;
  }

  const fetchHarmonograms = () => {
    HarmonogramService.showHarmonograms()
      .then(response => {
        console.log(currentUser);
        var new_harmonograms = response.data;
        for (var i = 0; i < new_harmonograms.length; i++) {
          if (checkIfBelong(new_harmonograms, new_harmonograms[i].id) === false) {
            new_harmonograms.splice(i, 1);
          }
        }
        setHarmonograms(new_harmonograms);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchRooms = () => {
    RoomService.showRooms()
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchActivities = () => {
    ActivityService.showActivities()
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchSchedules = () => {
    ScheduleService.showSchedules()
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchUsers = () => {
    UserService.showUsers()
      .then(response => {
        setUsers(response.data)
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  useEffect(() => {
    fetchHarmonograms();
    fetchRooms();
    fetchActivities();
    fetchSchedules();
    fetchUsers();
  }, []);

  function getActivityId(h_id) {
    if (schedules.find(schedule => schedule.harmonogram_id === h_id)) {
      return schedules.find(schedule => schedule.harmonogram_id === h_id).activity_id;
    }
    return null;
  }

  function getScheduleId(h_id) {
    if (schedules.find(schedule => schedule.harmonogram_id === h_id)) {
      return schedules.find(schedule => schedule.harmonogram_id === h_id).id;
    }
    return null;
  }

  function editHarmonogramHandler(h_id, s_id) {
    navigate('/schedule/edit/' + h_id + "/" + s_id);
  }

  function addHarmonogramHandler() {
    navigate('/schedule/add');
  }

  function deatilsHarmonogramHandler(h_id, s_id) {
    navigate('/schedule/show/' + h_id + "/" + s_id);
  }

  function deleteHandler(h_id, s_id) {
    setMessage("");
    setSuccessful(false);
    ScheduleService.deleteSchedule(s_id).then(() => {
      window.location.reload();
    }).catch((error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
      setSuccessful(false);
    })
  }

  function parseDate(date) {
    var parsed = new Date(date).toISOString().split(/[T.]/);
    parsed = parsed[0] + " " + parsed[1];
    return parsed;
  }

  return (
    <div>
      Harmonogram
      {showAdminBoard || showEmployeeBoard ?
        <button onClick={() => addHarmonogramHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
          Dodaj
        </button>
        : null
      }
      <table className='w-full text-center'>
        <thead>
          <th>Data rozpoczęcia</th>
          <th>Data zakończenia</th>
          <th>Nazwa zajęć</th>
          <th>Sala</th>
          <th>Prowadzący</th>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {harmonograms.map(h =>
            <tr key={h.id}>
              <td>{parseDate(h.begin_date)}</td>
              <td>{parseDate(h.end_date)}</td>
              <td>
                {
                  activities.find(activity => activity.id === getActivityId(h.id)) ?
                    activities.find(activity => activity.id === getActivityId(h.id)).name :
                    "brak"
                }
              </td>
              <td>
                {
                  rooms.find(room => room.id === h.room_id) ?
                    rooms.find(room => room.id === h.room_id).name :
                    "brak"
                }
              </td>
              <td>
                {
                  users.find(user => user.id === h.user_id) ?
                    users.find(user => user.id === h.user_id).first_name + " " + users.find(user => user.id === h.user_id).last_name :
                    "brak"
                }
              </td>
              <td>
                <button onClick={() => deatilsHarmonogramHandler(h.id, getScheduleId(h.id))} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                  Szczegóły
                </button>
              </td>
              {showAdminBoard || (showEmployeeBoard && currentUser.id === h.user_id) ?
                <td>
                  <button onClick={() => editHarmonogramHandler(h.id, getScheduleId(h.id))} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                    Edytuj
                  </button>
                </td>
                : <td></td>
              }
              {showAdminBoard || (showEmployeeBoard && currentUser.id === h.user_id) ?
                <td>
                  <button onClick={() => deleteHandler(h.id, getScheduleId(h.id))} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                    Usuń
                  </button>
                </td>
                : <td></td>
              }
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

/*
// https://ej2.syncfusion.com/react/documentation/schedule/getting-started/ <-dokumentacja
const Schedule = () => {
  const data = [
    {
        Id: 2,
        Subject: 'Meeting',
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 12, 30),
        IsAllDay: false,
        Status: 'Completed',
        Priority: 'High'
    },
];
  return (
     <ScheduleComponent height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={{
        dataSource: data,
        fields: {
            id: 'Id',
            subject: { name: 'Subject' },
            isAllDay: { name: 'IsAllDay' },
            startTime: { name: 'StartTime' },
            endTime: { name: 'EndTime' }
        }
    }}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    
  )
}
*/

export default Schedule
