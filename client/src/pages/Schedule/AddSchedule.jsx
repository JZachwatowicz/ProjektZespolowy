import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import { useStateContext } from '../../services/ContextProvider';
import { useNavigate, useLocation} from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';


import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import UserService from '../../services/user.service';
import RoomService from '../../services/room.service';
import ActivityService from '../../services/activity.service';
//CRUD + odczywytanie w tabeli


const AddSchedule = () => {
  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([])
  const [users, setUsers] = useState([])
  const [harmonograms, setHarmonograms] = useState([])
  const [rooms, setRooms] = useState([])
  const [activities, setActivities] = useState([])
  const [message, setMessage] = useState("")

  const fetchData = () => {
    HarmonogramService.showHarmonograms()
      .then(response => {
        setHarmonograms(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });

    RoomService.showRooms()
      .then(response => {
        setRooms(response.data.map(e => { return { id: e.id, name: e.name } }));
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });

    ActivityService.showActivities()
      .then(response => {
        setActivities(response.data.map(e => { return { id: e.id, name: e.name } }));
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });

    ScheduleService.showSchedules()
      .then(response => {
        setSchedules(response.data.map(e => { return { id: e.id, activity_id: e.activity_id, harmonogram_id: e.harmonogram_id } }));
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  function getActivityId(h_id){
    if(schedules.find(schedule => schedule.harmonogram_id === h_id)){
      return schedules.find(schedule => schedule.harmonogram_id === h_id).activity_id;
    }
    return null;
  }

  useEffect(() => {
    UserService.get_all_users()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, first_name: e.first_name, last_name: e.last_name } }))
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      })

    fetchData();
  }, []);


  return (
    <div>
      Add Harmonogram
    </div>
  )
}

export default AddSchedule
