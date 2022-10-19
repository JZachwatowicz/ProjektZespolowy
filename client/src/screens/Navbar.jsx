import { React, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth.service';

export default function Navbar() {
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowEmployeeBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <Container>


      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          LOGO
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showEmployeeBoard && (
            <li className="nav-item">
              <Link to={"/employee"} className="nav-link">
                Employee Board
              </Link>
            </li>

          )}

          {showAdminBoard && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/employee"} className="nav-link">
                  Employee Board
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            </div>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </Container>
  )
}
