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

  const  currentUser = AuthService.getCurrentUser();

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
    if(currentUser.roles.includes("ROLE_ADMIN")) fetchPendingReservations();
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
    var parsed =  new Date(date).toISOString().split(/[T.]/);
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
        {currentUser.roles.includes("ROLE_ADMIN") && 
        <table className='w-full text-center'>
        <thead>
            <tr>
                <th colspan="4">
            <h1 className="mb-8 text-center text-3xl  font-semibold"> Oczekujące prośby:</h1>
            </th>
            </tr>
            <tr>
          <th>Data rozpoczęcia</th>
          <th>Data zakończenia</th>
          <th>Nazwa sprzętu</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
        {pending.map(h =>
            <tr key={h.id}>
              <td>{parseDate(h.begin_date)}</td>
              <td>{parseDate(h.end_date)}</td>
              <td>
                {
                  items.find(item => item.id === h.item_id) ?
                    items.find(item => item.id === h.item_id).name :
                    "brak"
                }
              </td>
              <td>
                <button onClick={() => acceptHandler(h.id)} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                  Zaakceptuj
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
        }
        <div className={`p-11 shadow-2xl mb-20  ${screenSize <= 800 ? 'w-full' : 'w-10/12'}`}>
          <h1 className="mb-8 text-center text-3xl  font-semibold">Godziny:</h1>
          <hr />

          <Form onSubmit={addReservationHandler} ref={form} className="pt-4 flex-2 text-center">

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
           
            <div className='m-auto'>
              <button className='p-4 shadow-xl m-2 rounded-lg bg- border-1 bg-gray-600 text-white hover:bg-gray-400 hover:text-black' type="submit">
                Dodaj
              </button>
              <button className='p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-400 hover:text-white' type="Reset" onClick={handleCancel}>
                Anuluj
              </button>
            </div>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
        { currentUser.roles.includes("ROLE_USER") &&
        <table className='w-full text-center'>
        <thead>
            <tr>
                <th colspan="4">
            <h1 className="mb-8 text-center text-3xl  font-semibold">Twoje wyporzyczenia:</h1>
            </th>
            </tr>
            <tr>
          <th>Data rozpoczęcia</th>
          <th>Data zakończenia</th>
          <th>Nazwa sprzętu</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(h =>
            <tr key={h.id}>
              <td>{parseDate(h.begin_date)}</td>
              <td>{parseDate(h.end_date)}</td>
              <td>
                {
                  items.find(item => item.id === h.item_id) ?
                    items.find(item => item.id === h.item_id).name :
                    "brak"
                }
              </td>
              <td>
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
  )
}

export default AddReservation
