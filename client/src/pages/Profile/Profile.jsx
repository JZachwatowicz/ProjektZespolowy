import  React, {useEffect,useState} from "react";

import AuthService from "../../services/auth.service";

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
      <><header>
      <h3>Profil użytkownika</h3>
    </header><table>
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
          {/* <td>{currentUser.address}</td> */}
          {currentUser?.address_id ?
            <td>

              {address?.street?.name} {address?.building_number}{address?.apartment_number !== "" ? '/' + address?.apartment_number : null}
              {address?.street?.city?.name}
              woj.{address?.street?.city?.voivodeship?.name}
              {address?.street?.city?.voivodeship?.country?.name}
            </td>
            : <td>brak</td>}

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
      </table><div className="flex flex-wrap justify-center min-h-screen content-center">

        <ShowUserDescription />
      </div></>
  );
};

export default Profile;