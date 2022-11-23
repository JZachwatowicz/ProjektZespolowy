import React from "react";
import AuthService from "../../services/auth.service";

import { useNavigate, useLocation } from 'react-router-dom';


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();

  function editUserHandler() {
    navigate("/user/edit/" + currentUser.id);
  }

  function editUserAddressHandler() {
    navigate("/user/edit_address/" + currentUser.id);
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Profil użytkownika</h3>
      </header>
      <table>
        <tr>
          <td><strong>Login:</strong></td>
          <td>{currentUser.username}</td>
        </tr>
        <tr>
          <td><strong>Imię:</strong></td>
          <td>{currentUser.first_name}</td>
        </tr>
        <tr>
          <td><strong>Nazwisko:</strong></td>
          <td>{currentUser.last_name}</td>
        </tr>
        <tr>
          <td><strong>Adres e-mail:</strong></td>
          <td>{currentUser.email}</td>
        </tr>
        <tr>
          <td><strong>Adres zamieszkania:</strong></td>
          <td>{currentUser.address}</td>
        </tr>
        <tr>
          <td><strong>Uprawnienia:</strong></td>
          <td>{currentUser.roles}</td>
        </tr>
        <tr>
          <td><button onClick={() => editUserHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
            Edytuj swoje dane
          </button></td>
          <td><button onClick={() => editUserAddressHandler()} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
            Zmień adres
          </button></td>
        </tr>
      </table>
    </div>
  );
};

export default Profile;