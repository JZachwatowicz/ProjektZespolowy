import React, { useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';

// import { useStateContext } from '../services/ContextProvider';


const Navbar = () => {
  // const { setActiveMenu, setScreenSize, screenSize } = useStateContext();

  // useEffect(() => {
  //   const handleResize = () => setScreenSize(window.innerWidth);

  //   window.addEventListener('resize', handleResize);

  //   handleResize();

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // useEffect(() => {
  //   if (screenSize <= 900) {
  //     setActiveMenu(false);
  //   } else {
  //     setActiveMenu(true);
  //   }
  // }, [screenSize]);


  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {/* //placeholder */}
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'><Link className='nav-link' to="/addProduct">addProduct</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/products">products</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/home">home</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/home/about">About</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/home/contact">Contact</Link></li>
        </ul>
      </nav>
      <Outlet />

    </div>
  );
};

export default Navbar;
