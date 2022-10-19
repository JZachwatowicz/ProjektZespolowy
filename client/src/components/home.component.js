import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import UserService from "../services/user.service";


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">

      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'><Link className='nav-link' to="/addProduct">addProduct</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/products">products</Link></li>
        </ul>
      </nav>

      <h3>{content}</h3>
    </div>
  );
};

export default Home;