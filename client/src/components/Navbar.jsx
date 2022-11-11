import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useStateContext } from '../services/ContextProvider';

// dark: text-gray-200 items-center gap-3 ml-3 mt-4 flex text-xl capitalize




const Navbar = () => {

  const activeLink = 'flex items-center px-9 pt-3 pb-2.5 gap-3 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center px-9 pt-3 pb-2.5 gap-3 rounded-lg text-gray-700 text-md dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const { currentColor, screenSize } = useStateContext();


  const NavButton = ({ name, link, icon }) => (
    <NavLink end to={link} style={({ isActive }) => ({ backgroundColor: isActive ? currentColor : '' })}
      className={({ isActive }) => (isActive ? activeLink : normalLink)}>
      {icon}
      <span className="capitalize">{name}</span>

    </NavLink>
  );
  return (

    <>
      <div className={`${screenSize <= 900 ? 'flex-2' : 'flex'} justify-evenly p-2 md:mx-6 relative`}>

        <NavButton name="home" link="/home" icon={<FiShoppingBag />} />
        <NavButton name="about" link="/home/about" icon={<FiShoppingBag />} />
        <NavButton name="contact" link="/home/contact" icon={<FiShoppingBag />} />
        <NavButton name="news" link="/home/news" icon={<FiShoppingBag />} />
      </div>
      <Outlet />
    </>

  );
};

export default Navbar;
