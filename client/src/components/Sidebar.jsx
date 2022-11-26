import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../services/ContextProvider';
import AuthService from '../services/auth.service';

import AccessabilitySettings from './AccessabilitySettings';

const Sidebar = () => {

  const { currentColor, activeMenu, setActiveMenu, screenSize, setScreenSize, showEmployeeBoard, setShowEmployeeBoard, showAdminBoard, setShowAdminBoard,currentUser, setCurrentUser } = useStateContext();

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



  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <>
      {activeMenu ? (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
          <>
            <div className="flex justify-between items-center">
              <Link to="/" onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                <span>Menu/LOGO</span>
              </Link>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className={`text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" ${screenSize <= 900 ? null : "hidden"}`}
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>

            <div className="mt-10 ">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Akcje
              </p>
              {currentUser ? (
                <>
                  <NavLink
                    to={`/profile`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<FiShoppingBag />}
                    <span className="capitalize ">Profil</span>
                  </NavLink>
                  <NavLink
                    to={`/`}
                    onClick={handleCloseSideBar && logOut}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<FiShoppingBag />}
                    <span className="capitalize ">Wyloguj</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={`/login`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<FiShoppingBag />}
                    <span className="capitalize ">Zaloguj</span>
                  </NavLink>
                  <NavLink
                    to={`/register`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<FiShoppingBag />}
                    <span className="capitalize ">Zarejestruj</span>
                  </NavLink>
                </>)
              }
            </div>

            <div className="mt-10 ">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Menu
              </p>
              <NavLink
                to={`/home`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Strona główna</span>
              </NavLink>
              <NavLink
                to={`/schedule`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Harmonogram</span>
              </NavLink>
              <NavLink
                to={`/activities`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Aktywności</span>
              </NavLink>
              <NavLink
                to={`/items`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Sprzęt</span>
              </NavLink>
              <NavLink
                to={`/rooms`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Pokoje</span>
              </NavLink>
              <NavLink
                to={`/departments`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Wydziały</span>
              </NavLink>
            </div>
            {currentUser ? 
            <div className="mt-10 ">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Panel
              </p>
              <NavLink
                to={`/user`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Użytkownik</span>
              </NavLink>
              {(showEmployeeBoard || showAdminBoard) ? <NavLink
                to={`/employee`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Pracownik</span>
              </NavLink> : null}
              { showAdminBoard ? <NavLink
                to={`/admin`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<FiShoppingBag />}
                <span className="capitalize ">Administrator</span>
              </NavLink> : null}
            </div> : null}
          </>
          <AccessabilitySettings />
        </div>
      ) :

        (<NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />)}

    </>
  );
};

export default Sidebar;
