import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

//Dodawanie, odczytywanie opisów użytkowników, przeglądanie pacjentów (ogarniczone dane), rezerwacja sali (CRUD harmonogram), zapisanie/wypisanie pajenta z zajęć

const EmployeeBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getEmployeeBoard().then(
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
    <div className="container">
        <h3>{content}</h3>
    </div>
  );
};

export default EmployeeBoard;