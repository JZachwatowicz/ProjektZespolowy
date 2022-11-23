import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../services/ContextProvider';
import Pagination from "../../components/Pagination.jsx";
import { useNavigate, useLocation} from 'react-router-dom';

import ItemService from "../../services/item.service.js";
import AuthService from "../../services/auth.service.js";

  const ShowItems = () => {
  const [items, setItems] = useState([])
  const [types, setTypes] = useState([])
  const [filteredItems, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredItems.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredItems.length / recordsPerPage);
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const [search, setSearch] = useState('')
  const [searchType, setType] = useState('name');
  const user = AuthService.getCurrentUser();
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

  function HandleSearch(){
    if(search === ""){
      setFiltered(items);
      setCurrentPage(1);
    } else {
      switch(searchType){
        case "name":  setFiltered(items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())));
          setCurrentPage(1);
        break;
        case "serial":setFiltered(items.filter(i => i.serial_number.toLowerCase().includes(search.toLowerCase())));
          setCurrentPage(1);
        break;
        case "date" : setFiltered(items.filter(i => i.possesion_date.toLowerCase().includes(search.toLowerCase())));
          setCurrentPage(1);
        break;
        default: setFiltered(items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())));
          setCurrentPage(1);
      }
   
  }
  }

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const onChangeType = (e) => {
    const searchType = e.target.value;
    setType(searchType);
  };

  useEffect(() => {
    ItemService.showItems().then(
        (response) => {
          console.log(response.data)
          setItems(response.data);
          setFiltered(response.data);
        },
        (error) => {
          const _error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setMessage(_error);
        }
      );
    }, []);

  useEffect(() => {
    ItemService.getItemTypes().then(
        (response) => {
          console.log(response.data)
          setTypes(response.data);
        },
        (error) => {
          const _error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
            setMessage(_error);
        }
      );
    }, []);
    
    function returnItemType(id){
      let type = "Brak";
      for(const t of types){
        if(t.id === id ) type = t.name;
      }
      return type;
    }
    
  function editItemHandler(id) {
      navigate("/items/edit/" + id);
    }

    function handleAddItem(){
      navigate("/items/add");
    }

    function manageItemTypes(){
      navigate("/items/item_types");
    }

  function deleteItemHandler(id) {
    setMessage("");
    setSuccessful(false);
    
    ItemService.deleteItem(id).then(
        ()=> {
          navigate('/items', { state: { message: "Successfully delted item.", successful: true } });
          window.location.reload();
        },
        (error) => {
            const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
        }
    );
  }

  return (
    <div className='flex gap-10 flex-wrap justify-center'>
      <div className="p-11 mb-20 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Lista Sprzętu</h1>
          <div className=' grid grid-cols-3 content-center'>
            <div className="flex items-center col-span-2">
              <input className="form-control  dark:text-black p-3 rounded-l-lg w-4/5 shadow-md  w-max" 
                type="search" 
                placeholder="Search"
                value={search}
                onChange={onChangeSearch}
              />
              <select className="p-3  form-select font-medium  text-black shadow-md  max-w-3xl"
                value={searchType || ''}
                onChange={onChangeType}
              >
                <option value = {"name"} > Name</option>
                <option value = {"serial"} > Serial Number</option>
                <option value = {"date"} > Possesion Date</option>
              </select>
              <button className="p-4 mr-2 shadow-md  rounded-r-lg text-white bg-blue-400  hover:bg-blue-600"  onClick={()=>{HandleSearch()}}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>
            <div className='col-span-1 flex justify-end'>
              <button onClick={handleAddItem} className="p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white">
                Dodaj 
              </button>
              { user.roles.includes("ROLE_ADMIN") ? 
              <button onClick={manageItemTypes} className="p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white">
                Zarządzaj typami 
              </button> : null}
            </div>
          </div>
          <hr />
          {message && (
            <div
              className={
                successful ? "m-2 text-green-500 font-medium" : "m-2 text-red-500 font-medium"
              }
              role="alert"
            >
              {message}
            </div>
          )}
          <div className="pt-5 grid gap-x-2">
            {
              currentRecords.length > 0 
              && (
                currentRecords.map(i => (
                  <div className="grid grid-cols-7 border-2 rounded-lg p-3 pt-6 pb-6 shadow-md m-2 bg-white dark:bg-secondary-dark-bg dark:border-gray-700" key={i.id}>
                  <div className="col-span-2 break-all flex items-center p-1">{i.name}</div>
                  <div className=" flex flex-col p-1 items-center break-words "><b>Typ sprzętu:</b> <>{returnItemType(i.item_type_id)}</></div>
                  <div className=" flex flex-col p-1 items-center break-words "><b>Numer seryjny:</b> <>{i.serial_number}</></div>
                  <div className=" flex flex-col p-1 items-center break-words"><b>Data posesji:</b> <>{i.possesion_date}</></div>
                  <div className=" flex p-1 items-center break-words">{i.type}</div>
                    <div className=" flex justify-end items-center pr-2">
                      <div className={screenSize <= 1200 ? 'flex flex-col' : 'flex flex-row'}>
                        <button onClick={() => editItemHandler(i.id)} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                          Edytuj
                        </button>
                        <button onClick={() => deleteItemHandler(i.id)} className="flex text-center items-center p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
              )))}
              {
                currentRecords.length === 0 &&
                <h1  className="mb-8 text-center text-2xl text-stone-800 font-semibold"> There are no items to display.</h1>
              }
            </div>
              {nPages > 1  && 
                <div className='flex justify-center mt-5'>
                  <Pagination
                    nPages = { nPages }
                    currentPage = { currentPage } 
                    setCurrentPage = { setCurrentPage }
                  />
                </div>
              }
      </div>
    </div>
  );
}

export default ShowItems
