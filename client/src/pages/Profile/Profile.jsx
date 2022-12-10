import React, { useEffect, useState } from "react";

import AuthService from "../../services/auth.service";
import { CgProfile } from "react-icons/cg"
import { useNavigate } from 'react-router-dom';
import AddressService from '../../services/address.service'
import ShowUserDescription from "../User/ShowUserDescription";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  console.log(currentUser);
  const navigate = useNavigate();

  function editUserHandler() {
    navigate("/profile/edit");
  }

  function editUserAddressHandler() {
    navigate("/profile/editaddress");
  }
  const [address, setAddress] = useState({})

  useEffect(() => {
    AddressService.getAddress(currentUser.address_id)
      .then(res => {
        setAddress(res.data)
      })
      .catch(error => console.error(error));
  }, [])
  return (
    <><div className='flex gap-10 flex-wrap justify-center min-h-screen mb-5'>

      <div className="p-11 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Profil użytkownika</h1>
        <hr />
        <div className="p-10 flex-column flex justify-around">
      <div className="flex-1 gap-y-4 w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">

        <div class="w-48 h-48 bg-indigo-100 mt-18 mx-auto rounded-full  flex items-center justify-center text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
          <div className="p-8  flex justify-evenly items-center">

            <div>
              <h1 className="text-4xl font-medium ">{currentUser.first_name} {currentUser.last_name}, <span className="font-light ">{currentUser.username}</span></h1>
                       {currentUser?.address_id ?
                <>
                 <p className="font-light mt-3">  {address?.street?.name} {address?.building_number}{address?.apartment_number !== "" ? '/' + address?.apartment_number : null}</p>
                 <p className="font-light mt-1"> {address?.street?.city?.name}
                   {address?.street?.city?.voivodeship?.name}</p>
                  {address?.street?.city?.voivodeship?.country?.name}
                </>
                : "Brak adresu"}

              <p className="mt-4 ">{currentUser.email}</p>
              <p className="mt-2" >{currentUser.roles.map(e => e.substring(5))}</p>
            </div>
            <div className="flex flex-col">
              <button onClick={() => editUserHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                Edytuj swoje dane
              </button>
              <button onClick={() => editUserAddressHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                Zmień adres
              </button>
            </div>
          </div>
        </div>

      </div>
      </div>

      <ShowUserDescription />
    </div>

    </>

  );
};

export default Profile;