import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import { useStateContext } from '../../services/ContextProvider';
import UserService from '../../services/user.service';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import RoomService from '../../services/room.service';
import ActivityService from '../../services/address.service';
//CRUD + odczywytanie w tabeli


const Schedule = () => {
  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  //const [schedules, setSchedules] = useState([])
  const [users, setUsers] = useState([])
  const [harmonograms, setHarmonograms] = useState([])
  const [message, setMessage] = useState("")
/*
  const fetchSchedules = () => {
    ScheduleService.showSchedules()
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      })
  }*/

  const fetchHarmonograms = () => {
    HarmonogramService.showHarmonograms()
      .then(response => {
        setHarmonograms(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      })
  }

  function getRoomName(id) {
    RoomService.getRoom(id).then(response => {
      return response[0].name;
    })
  }

  function getAcitvityName(id) {
    ScheduleService.getSchedule(id).then(response => {
      return response[0].activity_id;
    })
  }

  function getUserName(id) {
    UserService.get_one_user(id).then(response => {
      return response[0];
    })
  }

  useEffect(() => {
    UserService.get_all_users()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, username: e.username } }))
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      })

    //fetchSchedules();
    fetchHarmonograms();
  }, []);

  return (
    <div>
      Harmonogram
      <button>Dodaj</button>
      <table className='w-full text-center'>
        <thead>
          <th>Data rozpoczęcia</th>
          <th>Data zakończenia</th>
          <th>Nazwa zajęć</th>
          <th>Sala</th>
          <th>Prowadzący</th>
          <th></th>
        </thead>
        <tbody>
          {harmonograms.map(h =>
            <tr key={h.id}>
              <td>{h.begin_date}</td>
              <td>{h.end_date}</td>
              <td>{getAcitvityName(h.shedule_id)}</td>
              <td>{getRoomName(h.room_id)}</td>
              <td>{getUserName(h.user_id)}</td>
              <td><button>Edytuj</button></td>
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
