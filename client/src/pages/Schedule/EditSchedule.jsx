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

const vdate = (value) => {
  if (value > Date.now()) {
    return (
      <div className="text-red-500 font-medium">
        Nie można utworzyć planu z datą przeszłą.
      </div>
    );
  }
};

const EditSchedule = () => {
  let { h_id, s_id } = useParams();
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();


  const [schedule, setSchedule] = useState([])
  const [users, setUsers] = useState([])
  const [harmonogram, setHarmonogram] = useState([])
  const [rooms, setRooms] = useState([])
  const [activities, setActivities] = useState([])
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

  const [begin_date_v, setBeginDate] = useState('');
  const [end_date_v, setEndDate] = useState('');
  const [room_id_v, setRoomId] = useState('');
  const [activity_id_v, setActivityId] = useState('');

  const fetchHarmonograms = () => {
    HarmonogramService.showHarmonograms()
      .then(response => {
        setHarmonogram(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchSchedule = () => {
    ScheduleService.showSchedules()
      .then(response => {
        setSchedule(response.data);
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
    fetchHarmonograms();
    fetchSchedule();
    fetchRoom();
    fetchActivity();
    fetchUser();
  }, []);

  const handleCancel = () => {
    navigate("/schedule")
  }

  const onChangeBeginDate = (e) => {
    const x = e.target.value;
    setBeginDate(x);
  };

  const onChangeEndDate = (e) => {
    const x = e.target.value;
    setEndDate(x);
  };

  const onChangeActivity = (e) => {
    const x = e.target.value;
    setActivityId(x);
  };

  const onChangeRoom = (e) => {
    const x = e.target.value;
    setRoomId(x);
  };

  const editScheduleHandler = async (e) => {
    e.preventDefault()

    setMessage("");
    setSuccessful(false)

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      var data = {
        begin_date: begin_date_v,
        end_date: end_date_v,
        room_id: room_id_v
      }
      await HarmonogramService.editHarmonogram(h_id, data)
        .then(() => {
          data = {
            harmonogram_id: h_id,
            activity_id: activity_id_v
          }
          ScheduleService.editSchedule(s_id, data)
            .then(() => {
              navigate("/schedule", { state: { message: "Successfully added room.", successful: true } })
              window.location.reload();
              setSuccessful(true);
              setMessage("Successfuly added schedule.");
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
          <h1 className="mb-8 text-center text-3xl  font-semibold">Godziny:</h1>
          <hr />

          <Form onSubmit={editScheduleHandler} ref={form} className="pt-4 flex-2 text-center">

            <Input className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
              value={begin_date_v}
              name="begin_date_v"
              onChange={onChangeBeginDate}
              type="datetime-local"
              validations={[required, vdate]}
            />
            <Input className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl "
              value={end_date_v}
              name="end_date_v"
              onChange={onChangeEndDate}
              type="datetime-local"
              validations={[required, vdate]}
            />
            <Select className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl"
              value={room_id_v}
              onChange={onChangeRoom}
              validations={[required]}
            >
              <option value={harmonogram.room_id} key={harmonogram.room_id}>----</option>
              {
                rooms.length > 0 &&
                rooms.map(room => (
                  <option value={room.id} key={room.id}>{room.name}</option>
                ))
              }
            </Select>
            <Select className="form-control dark:text-black p-3 m-2 border-b-2 shadow-md  w-full max-w-3xl"
              value={activity_id_v}
              onChange={onChangeActivity}
              validations={[required]}
            >
              <option value={schedule.activity_id} key={schedule.activity_id}>----</option>
              {
                activities.length > 0 &&
                activities.map(activity => (
                  <option value={activity.id} key={activity.id}>{activity.name}</option>
                ))
              }
            </Select>
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
