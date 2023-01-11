import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-validation/build/select';
import CheckButton from "react-validation/build/button"
import { useStateContext } from '../../services/ContextProvider';
import { useNavigate } from 'react-router-dom';

import HarmonogramService from '../../services/harmonogram.service'
import ScheduleService from '../../services/schedule.service'
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

const AddSchedule = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { screenSize } = useStateContext();

  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [rooms, setRooms] = useState([])
  const [activities, setActivities] = useState([])

  const [begin_date_v, setBeginDate] = useState('')
  const [end_date_v, setEndDate] = useState('')
  const [room_id_v, setRoomId] = useState('')
  const [activity_id_v, setActivityId] = useState('')

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

  useEffect(() => {
    fetchRoom();
    fetchActivity();
  }, []);

  const addScheduleHandler = async (e) => {
    e.preventDefault()

    setMessage("");
    setSuccessful(false)

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      var data = {
        begin_date: begin_date_v,
        end_date: end_date_v,
        user_id: currentUser.id,
        room_id: room_id_v
      }

      await HarmonogramService.addHarmonogram(data)
        .then((harmonogram) => {
          console.log(harmonogram);
          data = {
            harmonogram_id: harmonogram.data.data.id,
            activity_id: activity_id_v
          }
          ScheduleService.addSchedule(data)
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
  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

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
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
          <h1 className="mb-8 text-center text-3xl  font-semibold">Godziny:</h1>


          <Form onSubmit={addScheduleHandler} ref={form} className="space-y-6">
            <hr />
            <div className="mb-6">
              <label for="begin_date_v" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data rozpoczęcia</label>
              <Input
                className={formStyle}
                value={begin_date_v}
                name="begin_date_v"
                onChange={onChangeBeginDate}
                type="datetime-local"
                validations={[required, vdate]}
              />
            </div>
            <div className="mb-6">
              <label for="end_date_v" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data zakończenia</label>
              <Input
                className={formStyle}
                value={end_date_v}
                name="end_date_v"
                onChange={onChangeEndDate}
                type="datetime-local"
                validations={[required, vdate]}
              />
            </div>
            <div className="mb-6">
              <label for="room" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sala</label>
              <Select
                name="room"
                className={formStyle}
                value={room_id_v || ''}
                onChange={onChangeRoom}
                validations={[required]}
              >
                <option value={null} >----</option>
                {
                  rooms.length > 0 &&
                  rooms.map(room => (
                    <option value={room.id} key={room.id}>{room.name}</option>
                  ))
                }
              </Select>
            </div>
            <div className="mb-6">
              <label for="activity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zajęcia</label>
              <Select
                name="activity"
                className={formStyle}
                value={activity_id_v || ''}
                onChange={onChangeActivity}
                validations={[required]}
              >
                <option value={null} >----</option>
                {
                  activities.length > 0 &&
                  activities.map(activity => (
                    <option value={activity.id} key={activity.id}>{activity.name}</option>
                  ))
                }
              </Select>
            </div>
            <button
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit">
              Dodaj
            </button>
            <button
              className="w-full text-white bg-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center py-2.5 dark:hover:bg-gray-100 "
              type="Reset" onClick={handleCancel}>
              Anuluj
            </button>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddSchedule
