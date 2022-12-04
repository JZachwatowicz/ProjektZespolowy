import React, { useState, useEffect } from 'react'
//import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
//import Textarea from "react-validation/build/textarea";
//import CheckButton from "react-validation/build/button"
//import { useStateContext } from '../../services/ContextProvider';
import { useNavigate, useLocation} from 'react-router-dom';
//import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import UserService from '../../services/user.service';
import RoomService from '../../services/room.service';
import ActivityService from '../../services/activity.service';
//CRUD + odczywytanie w tabeli


const Schedule = () => {
  //const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([])
  const [users, setUsers] = useState([])
  const [harmonograms, setHarmonograms] = useState([])
  const [rooms, setRooms] = useState([])
  const [activities, setActivities] = useState([])
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

  const fetchHarmonogram = () => {
    HarmonogramService.showHarmonograms()
      .then(response => {
        setHarmonograms(response.data);
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
        setActivities(response.data.map(e => { return { id: e.id, name: e.name } }));
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchSchedule = () => {
    ScheduleService.showSchedules()
      .then(response => {
        setSchedules(response.data.map(e => { return { id: e.id, activity_id: e.activity_id, harmonogram_id: e.harmonogram_id } }));
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchUser = () => {
    UserService.get_all_users()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, first_name: e.first_name, last_name: e.last_name } }))
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  useEffect(() => {
    fetchHarmonogram();
    fetchRoom();
    fetchActivity();
    fetchSchedule();
    fetchUser();
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

  function deleteHandler(h_id, s_id) {
    setMessage("");
    setSuccessful(false);
    ScheduleService.deleteSchedule(s_id).then(() => {
      HarmonogramService.deleteHarmonogram(h_id).then(() => {
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


  return (
    <div>
      Harmonogram
      <button onClick={() => addHarmonogramHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
        Dodaj
      </button>
      <table className='w-full text-center'>
        <thead>
          <th>Data rozpoczęcia</th>
          <th>Data zakończenia</th>
          <th>Nazwa zajęć</th>
          <th>Sala</th>
          <th>Prowadzący</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {harmonograms.map(h =>
            <tr key={h.id}>
              <td>{h.begin_date}</td>
              <td>{h.end_date}</td>
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
                <button onClick={() => editHarmonogramHandler(h.id, getScheduleId(h.id))} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                  Edytuj
                </button>
              </td>
              <td>
                <button onClick={() => deleteHandler(h.id, getScheduleId(h.id))} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                  Usuń
                </button>
              </td>
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
