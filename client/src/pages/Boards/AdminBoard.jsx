import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import UserService from "../../services/user.service";
import ShowUsers from "../User/ShowUsers";

//CRUD użytkowników, akceptacja harmonogramu (odczyt, funkcja accept), CRUD aktywności, CRUD pokoje + departament, CRUD typy

const AdminBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">
    <Link to={'/admin/users'}>goto users</Link>
    </div>
  );
};

export default AdminBoard;