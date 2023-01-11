import React, { useState, useEffect } from 'react'

import { useStateContext } from '../../services/ContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize } from '@syncfusion/ej2-react-schedule';

import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import UserService from '../../services/user.service';
import RoomService from '../../services/room.service';
import ActivityService from '../../services/activity.service';
import AuthService from '../../services/auth.service';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'pl': {
    "schedule": {
      "day": "Dzień",
      "week": "Tydzień",
      "workWeek": "Tydzień pracy",
      "month": "Miesiąc",
      "year": "Rok",
      "agenda": "Program",
      "weekAgenda": "Program tygodniowy",
      "workWeekAgenda": "Agenda Tygodnia Pracy",
      "monthAgenda": "Agenda miesiąca",
      "today": "Dzisiaj",
      "noEvents": "Brak wydarzeń",
      "emptyContainer": "Na ten dzień nie zaplanowano żadnych wydarzeń.",
      "allDay": "Cały dzień",
      "start": "Początek",
      "end": "Koniec",
      "more": "więcej",
      "close": "Blisko",
      "cancel": "Anuluj",
      "noTitle": "(Bez tytułu)",
      "delete": "Usunąć",
      "deleteEvent": "Wydarzenie",
      "deleteMultipleEvent": "Usuń wiele zdarzeń",
      "selectedItems": "Wybrane elementy",
      "deleteSeries": "Cała seria",
      "edit": "Edytować",
      "editSeries": "Cała seria",
      "editEvent": "Wydarzenie",
      "createEvent": "Stwórz",
      "subject": "Przedmiot",
      "addTitle": "Dodaj tytuł",
      "moreDetails": "Więcej szczegółów",
      "save": "Zapisać",
      "editContent": "Jak chciałbyś zmienić spotkanie w serialu?",
      "deleteContent": "Czy na pewno chcesz usunąć to wydarzenie?",
      "deleteMultipleContent": "Czy na pewno chcesz usunąć wybrane wydarzenia?",
      "newEvent": "Nowe wydarzenie",
      "title": "Tytuł",
      "location": "Lokalizacja",
      "description": "Opis",
      "timezone": "Strefa czasowa",
      "startTimezone": "Uruchom strefę czasową",
      "endTimezone": "Koniec strefy czasowej",
      "repeat": "Powtarzać",
      "saveButton": "Zapisać",
      "cancelButton": "Anuluj",
      "deleteButton": "Usunąć",
      "recurrence": "Nawrót",
      "wrongPattern": "Wzorzec powtarzania się jest nieprawidłowy.",
      "seriesChangeAlert": "Czy chcesz anulować zmiany wprowadzone w określonych wystąpieniach tej serii i ponownie dopasować ją do całej serii?",
      "createError": "Czas trwania wydarzenia musi być krótszy niż częstotliwość jego występowania. Skróć czas trwania lub zmień wzorzec cyklu w edytorze zdarzeń cyklicznych.",
      "sameDayAlert": "Dwa wystąpienia tego samego zdarzenia nie mogą wystąpić tego samego dnia.",
      "occurenceAlert": "Nie można przełożyć wystąpienia spotkania cyklicznego, jeśli pomija późniejsze wystąpienie tego samego spotkania.",
      "editRecurrence": "Edytuj cykl",
      "repeats": "Powtarza się",
      "alert": "Alarm",
      "startEndError": "Wybrana data końcowa występuje przed datą początkową.",
      "invalidDateError": "Wprowadzona wartość daty jest nieprawidłowa.",
      "blockAlert": "Zdarzenia nie mogą być zaplanowane w zablokowanym przedziale czasowym.",
      "ok": "Dobrze",
      "yes": "tak",
      "no": "Nie",
      "occurrence": "Występowanie",
      "series": "Seria",
      "previous": "Poprzedni",
      "next": "Kolejny",
      "timelineDay": "Dzień na osi czasu",
      "timelineWeek": "Tydzień na osi czasu",
      "timelineWorkWeek": "Tydzień roboczy osi czasu",
      "timelineMonth": "Miesiąc osi czasu",
      "timelineYear": "Rok na osi czasu",
      "editFollowingEvent": "Następujące wydarzenia",
      "deleteTitle": "Usuń wydarzenie",
      "editTitle": "Edytuj wydarzenie",
      "beginFrom": "Zacząć od",
      "endAt": "Koniec o",
      "expandAllDaySection": "Rozwiń sekcję całodniową",
      "collapseAllDaySection": "Zwiń sekcję całodniową",
      "searchTimezone": "Wyszukaj strefę czasową",
      "noRecords": "Nic nie znaleziono"
    }
  }
});

const Schedule = () => {
  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  const navigate = useNavigate();
  const [view, setView] = useState(true);
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
    if (currentUser.roles[0] === "ROLE_ADMIN") {
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
  const data = harmonograms.map(h => (
    {
      begin_date: h.begin_date,
      end_date: h.end_date,
      activity: activities.find(activity => activity.id === getActivityId(h.id)) ? activities.find(activity => activity.id === getActivityId(h.id)).name : "brak",
      description: "Sala: " + (rooms.find(room => room.id === h.room_id) ? rooms.find(room => room.id === h.room_id).name : "brak")
        + "<br>" +
        "Prowadzący: " + (users.find(user => user.id === h.user_id) ? users.find(user => user.id === h.user_id).first_name + " " + users.find(user => user.id === h.user_id).last_name : "brak")
    }
  ))
  return (


    <div className='flex gap-10 flex-wrap justify-center min-h-screen mb-5'>

      <div className="p-11 flex-1 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Harmonogram</h1>
        <hr />
        <div className='flex flex-row justify-between my-2'>
          {showAdminBoard || showEmployeeBoard ?
            <button onClick={() => addHarmonogramHandler()} className="p-3 shadow-xl m-1 rounded-lg  bg-green-700 text-white hover:bg-gray-400 hover:text-black ">
              Dodaj
            </button>
            : null
          }
          <button className=" p-3 shadow-xl m-1 rounded-lg  bg-yellow-800 text-white hover:bg-gray-400 hover:text-black " onClick={() => setView(!view)}>Widok {view ? "tabeli" : "kalendarza"} </button>
        </div>

        {view ?
          //locale='pl'
          <ScheduleComponent height='600px' selectedDate={new Date()} firstDayOfWeek={1} eventSettings={{
            dataSource: data,
            fields: {
              subject: { name: 'activity' },
              description: { name: 'description' },
              startTime: { name: 'begin_date' },
              endTime: { name: 'end_date' }

            }
          }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize]} />
          </ScheduleComponent>
          :
          <div className="overflow-x-auto relative shadow-lg sm:rounded-lg border-1">

            <table className="w-full text-left  rounded-lg" >
              <thead className="uppercase text-white bg-secondary-dark-bg dark:bg-slate-300 dark:text-black">
                <th scope="col" className="py-3 px-6">Data rozpoczęcia</th>
                <th scope="col" className="py-3 px-6">Data zakończenia</th>
                <th scope="col" className="py-3 px-6">Nazwa zajęć</th>
                <th scope="col" className="py-3 px-6">Sala</th>
                <th scope="col" className="py-3 px-6">Prowadzący</th>
                <th scope="col" className="py-3 px-6" colSpan={3}>Akcje</th>
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
        }
      </div>
    </div>
  )
}



export default Schedule
