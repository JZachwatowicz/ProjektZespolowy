import React, { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../../services/ContextProvider';
import Pagination from "../../components/Pagination.jsx";
import { useNavigate, useLocation} from 'react-router-dom';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import ItemService from "../../services/item.service.js";

const required = (value) => {
    if (!value) {
      return (
        <div className="text-red-500 font-medium">
          To pole jest wymagane!
        </div>
      );
    }
  };
  
  const vname = (value) => {
    if (value.length > 45) {
      return (
        <div className="text-red-500 font-medium">
          Nazwa może mieć maksymalnie 45 znaków.
        </div>
      );
    }
  };


  const ItemTypes = () => {

    const AddForm = useRef();
    const EditForm = useRef();
    const AddCheckBtn = useRef();
    const EditCheckBtn = useRef();
    const [showEdit, setShowEdit] = useState(-1)
  const [types, setTypes] = useState([])
  const [filteredItems, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredItems.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredItems.length / recordsPerPage);
  const [addName, setAddName] = useState('')
  const [editName, setEditName] = useState('')
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const [search, setSearch] = useState('')
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);

  function HandleSearch(){
    if(search === ""){
        setFiltered(types);
        setCurrentPage(1);
    } else {
        setFiltered(types.filter(i => i.name.toLowerCase().includes(search.toLowerCase())));
        setCurrentPage(1);
    }
  }

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const onChangeAddName = (e) => {
    const name = e.target.value;
    setAddName(name);
  };

  const onChangeEditName = (e) => {
    const name = e.target.value;
    setEditName(name);
  };


  useEffect(() => {
    ItemService.getItemTypes().then(
        (response) => {
          console.log(response.data)
          setTypes(response.data);
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

      const handleAddType = async (e) => {
        e.preventDefault()

        setMessage("");
        setSuccessful(false)

        AddForm.current.validateAll();
        if (AddCheckBtn.current.context._errors.length === 0) {
            ItemService.addItemType(addName).then(
                ()=> {
                    navigate("/items/item_types", { state: { message: "Successfully added item type.", successful: true } })
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
      }
      

      const handleEditType = async (e, id) => {
        e.preventDefault()

        setMessage("");
        setSuccessful(false)

        AddForm.current.validateAll();
        if (EditCheckBtn.current.context._errors.length === 0) {
            ItemService.editItemType(id, editName).then(
                ()=> {
                    navigate("/items/item_types", { state: { message: "Successfully edited item type.", successful: true } })
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
      }

      const handleCancel = () => {
        navigate("/items");
    };

    function deleteItemHandler(id) {
      setMessage("");
      setSuccessful(false);
      
      ItemService.deleteItemType(id).then(
          ()=> {
            navigate('/items/item_types', { state: { message: "Successfully delted item type.", successful: true } });
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
      <button className="p-4 shadow-xl rounded-lg border-1 hover:bg-gray-600 hover:text-white"  onClick={handleCancel}> 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
              </button><h1 className="mb-8 text-center text-3xl font-semibold">Typy sprzętu</h1>
          <div className=' grid grid-cols-2 content-center'>
            <div className="flex items-center ">
              <input className="form-control shadow-md dark:text-black p-3 rounded-l-lg w-4/5  w-max" 
                type="search" 
                placeholder="Search"
                value={search}
                onChange={onChangeSearch}
              />
              <button className="p-4 mr-2 shadow-md  rounded-r-lg text-white bg-blue-400  hover:bg-blue-600"  onClick={()=>{HandleSearch()}}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>
            <Form onSubmit={handleAddType} ref={AddForm} className='col-span-1 flex items-start justify-end'>
                <Input  className="rounded-l-lg form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                    value={addName}
                    name="addName"
                    placeholder="Nazwa"
                    onChange={onChangeAddName}
                    type="text"
                    validations={[required, vname]}
                />
                <button type="submit" className="p-3 shadow-md m-2 rounded-r-lg border-1 hover:bg-gray-600 hover:text-white">
                    Dodaj 
                </button>
                <CheckButton style={{ display: "none" }} ref={AddCheckBtn} />
            </Form>
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
          <div className="pt-5 grid gap-x-2 ">
            {
              currentRecords.length > 0 
              && (
                currentRecords.map(i => (
                  
                    <div className="grid grid-cols-2 border-2 rounded-lg p-2  shadow-md m-2 bg-white dark:bg-secondary-dark-bg dark:border-gray-700" key={i.id}>
                    <div className=" break-all flex items-center p-1">{i.name}</div>
                      <div className=" flex justify-end items-center pr-2">
                        <div>
                          {showEdit === i.id ?  
                          <Form onSubmit={(e) => handleEditType(e, i.id)} ref={EditForm} className='col-span-1 flex items-start justify-end'>
                                <Input  className="rounded-l-lg form-control p-3 m-2 border-b-2 shadow-md w-full max-w-3xl"
                                    value={editName}
                                    name="editName"
                                    placeholder="Nazwa"
                                    onChange={onChangeEditName}
                                    type="text"
                                    validations={[required, vname]}
                                />
                                <button type="submit" className="p-3 shadow-xl m-2 rounded-r-lg border-1 hover:bg-gray-600 hover:text-white">
                                    Edit 
                                </button>
                                <CheckButton style={{ display: "none" }} ref={EditCheckBtn} />
                            </Form>
                           :<button onClick={() => setShowEdit(i.id)} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                           Edytuj
                         </button> }  
                          
                          </div>
                          <button onClick={() => deleteItemHandler(i.id)} className="flex text-center items-center p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                          </button>
                      </div>
                    </div>
              )))}
              {
                currentRecords.length === 0 &&
                <h1  className="mb-8 text-center text-2xl text-stone-800 font-semibold"> There are no types to display.</h1>
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

export default ItemTypes
