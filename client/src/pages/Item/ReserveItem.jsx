import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-validation/build/select';
import CheckButton from "react-validation/build/button"
import { useStateContext } from '../../services/ContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';

import HarmonogramService from '../../services/harmonogram.service'
import AuthService from '../../services/auth.service'
import ItemService from '../../services/item.service';
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
        Nie można utworzyć reservacji z datą przeszłą.
      </div>
    );
  }
};

const AddReservation = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { screenSize } = useStateContext();

  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

  const [items, setItems] = useState([])
  const [reservations, setReservations] = useState([])
  const [pending, setPending] = useState([])
  const [begin_date_v, setBeginDate] = useState('')
  const [end_date_v, setEndDate] = useState('')
  const [item_id_v, setItemId] = useState('')



  const fetchItems = () => {
    ItemService.showItems()
      .then(response => {
        setItems(response.data.map(e => { return { id: e.id, name: e.name } }));
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchUserReservations = () => {
    HarmonogramService.getUserReservations(currentUser.id)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }

  const fetchPendingReservations = () => {
    HarmonogramService.getPendingReservations()
      .then(response => {
        setPending(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      });
  }



  useEffect(() => {
    fetchItems();
    fetchUserReservations();
    if (currentUser.roles.includes("ROLE_ADMIN")) fetchPendingReservations();
  }, []);

  const addReservationHandler = async (e) => {
    e.preventDefault()

    setMessage("");
    setSuccessful(false)

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      var data = {
        begin_date: begin_date_v,
        end_date: end_date_v,
        user_id: currentUser.id,
        item_id: item_id_v
      }

      await HarmonogramService.addHarmonogram(data)
        .then((harmonogram) => {
          navigate("/booking", { state: { message: "Successfully reserved an item. Your request is awating admin consent.", successful: true } })
          window.location.reload();
          setSuccessful(true);
          setMessage("Successfully reserved an item. Your request is awating admin consent.");
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

  const onChangeItem = (e) => {
    const x = e.target.value;
    setItemId(x);
  };

  function parseDate(date) {
    var parsed = new Date(date).toISOString().split(/[T.]/);
    parsed = parsed[0] + " " + parsed[1];
    return parsed;
  }

  function deleteHandler(h_id) {
    setMessage("");
    setSuccessful(false);
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
    });

  }

  function acceptHandler(h_id) {
    setMessage("");
    setSuccessful(false);
    HarmonogramService.acceptHarmonogram(h_id).then(() => {
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
    });

  }
  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


  return (
    <div className='flex gap-10 flex-wrap justify-center min-h-screen mb-5'>

      <div className="p-11 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Wypożyczenia sprzętu</h1>
        <hr />


        <div className='flex flex-wrap justify-center min-h-screen content-center p-3'>
          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
          {currentUser.roles.includes("ROLE_ADMIN") &&
            <div className="overflow-x-auto relative shadow-lg sm:rounded-lg w-10/12 border-1 m-5">

              <table className="w-full text-left  rounded-lg" >
                <caption className="p-5 text-lg font-semibold text-center text-gray-900 bg-white dark:text-white dark:bg-secondary-dark-bg">
                  Oczekujące prośby:
                </caption>
                <thead className="uppercase text-white bg-secondary-dark-bg dark:bg-slate-300 dark:text-black">
                  <tr>
                    <th scope="col" className="py-3 px-6">Data rozpoczęcia</th>
                    <th scope="col" className="py-3 px-6">Data zakończenia</th>
                    <th scope="col" className="py-3 px-6">Nazwa sprzętu</th>
                    <th scope="col" className="py-3 px-6">Akcja</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map(h =>
                    <tr key={h.id} className="bg-white border-b dark:bg-secondary-dark-bg dark:border-gray-700">
                      <td className="py-4 px-6">{parseDate(h.begin_date)}</td>
                      <td className="py-4 px-6">{parseDate(h.end_date)}</td>
                      <td className="py-4 px-6">
                        {
                          items.find(item => item.id === h.item_id) ?
                            items.find(item => item.id === h.item_id).name :
                            "brak"
                        }
                      </td>
                      <td className="py-4 px-6">
                        <button onClick={() => acceptHandler(h.id)} className="p-3 shadow-xl m-1 rounded-lg  bg-green-700 text-white hover:bg-gray-400 hover:text-black ">
                          Zaakceptuj
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          }
          
          <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
            <h1 className="mb-8 text-center text-3xl  font-semibold">Godziny:</h1>

            <Form onSubmit={addReservationHandler} ref={form} className="space-y-6">
              <hr />
              <div className="mb-6">
                <label for="begin_date_v" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data rozpoczęcia</label>
                <Input
                  className={formStyle}
                  value={begin_date_v}
                  name="begin_date_v"
                  onChange={onChangeBeginDate}
                  type="datetime-local"
                  validations={[required, vdate]} />
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
                <label for="item_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Przedmiot</label>

                <Select
                  className={formStyle}
                  name="item_name"
                  value={item_id_v || ''}
                  onChange={onChangeItem}
                  validations={[required]}
                >
                  <option value={null} >----</option>
                  {
                    items.length > 0 &&
                    items.map(item => (
                      <option value={item.id} key={item.id}>{item.name}</option>
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

          {currentUser.roles.includes("ROLE_USER") &&
            <table className="w-full text-left  rounded-lg" >
              <caption className="p-5 text-lg font-semibold text-center text-gray-900 bg-white dark:text-white dark:bg-secondary-dark-bg">
                Twoje wyporzyczenia:
              </caption>
              <thead className="uppercase text-white bg-secondary-dark-bg dark:bg-slate-300 dark:text-black">
                <tr>
                  <th scope="col" className="py-3 px-6">Data rozpoczęcia</th>
                  <th scope="col" className="py-3 px-6">Data zakończenia</th>
                  <th scope="col" className="py-3 px-6">Nazwa sprzętu</th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(h =>
                  <tr key={h.id} className="bg-white border-b dark:bg-secondary-dark-bg dark:border-gray-700">
                    <td className="py-4 px-6">{parseDate(h.begin_date)}</td>
                    <td className="py-4 px-6">{parseDate(h.end_date)}</td>
                    <td className="py-4 px-6">
                      {
                        items.find(item => item.id === h.item_id) ?
                          items.find(item => item.id === h.item_id).name :
                          "brak"
                      }
                    </td>
                    <td className="py-4 px-6">
                      <button onClick={() => deleteHandler(h.id)} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                        Usuń
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  )
}

export default AddReservation
