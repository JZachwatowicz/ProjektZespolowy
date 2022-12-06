import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { BsFillHouseDoorFill } from 'react-icons/bs';
import { RiContactsBook2Fill, RiNewspaperFill } from 'react-icons/ri';
import { BiBookOpen } from 'react-icons/bi';
import { useStateContext } from '../services/ContextProvider';




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

        <NavButton name="Strona główna" link="/home" icon={<BsFillHouseDoorFill />} />
        <NavButton name="O&nbsp;nas" link="/home/about" icon={<BiBookOpen />} />
        <NavButton name="Kontakt" link="/home/contact" icon={<RiContactsBook2Fill />} />
        <NavButton name="Aktualności" link="/home/news" icon={<RiNewspaperFill />} />
      </div>
      <Outlet />
    </>

  );
};

export default Navbar;
