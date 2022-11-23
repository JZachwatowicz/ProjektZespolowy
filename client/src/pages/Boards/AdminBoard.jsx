import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

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
    <div className="container">
        <h3>{content}</h3>
    </div>
  );
};

export default AdminBoard;