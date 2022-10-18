import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardEmployee = () => {
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

export default BoardEmployee;