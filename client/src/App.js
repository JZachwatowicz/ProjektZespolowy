import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar, Footer, Navbar } from './components';
import { Home, Login, Register, Profile, Schedule, AdminBoard, EmployeeBoard, UserBoard, About, Contact, News } from './pages';
import './App.css'

import { useStateContext } from './services/ContextProvider';

import AddActivity from './pages/AddActivity'
import EditActivity from './pages/EditActivity'
import ShowActivities from './pages/ShowActivities'

import EditItem from './pages/EditItem'
import AddItem from './pages/AddItem'
import ShowItems from './pages/ShowItems'

import ItemTypes from './pages/ItemTypes'

import EditRoom from './pages/EditRoom'
import AddRoom from './pages/AddRoom'
import ShowRooms from './pages/ShowRooms'

import RoomTypes from './pages/RoomTypes'


const App = () => {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu} = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex-1 relative dark:bg-main-dark-bg dark:text-gray-200" >
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full' 
             ${activeMenu ? 'md:ml-72' : 'flex-2'}`
            }
          >
            <Routes>

              <Route path="/" element={<Navigate to="/home" />} />

              <Route exact path="/home" element={<Navbar />} >
                <Route index element={<Home />} />
                <Route exact path="/home/contact" element={<Contact />} />
                <Route exact path="/home/about" element={<About />} />
                <Route exact path="/home/news" element={<News />} />
              </Route>



              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />


              <Route exact path="/user" element={<UserBoard />} />
              <Route exact path="/employee" element={<EmployeeBoard />} />
              <Route exact path="/admin" element={<AdminBoard />} />
              <Route exact path="/schedule" element={<Schedule />} />

              <Route exact path='/activities/add' element={<AddActivity />} />
              <Route exact path='/activities/edit/:id' element={<EditActivity />} />
              <Route exact path="/activities" element={<ShowActivities />} />

              <Route exact path='/items/add' element={<AddItem />} />
              <Route exact path='/items/edit/:id' element={<EditItem />} />
              <Route exact path="/items" element={<ShowItems />} />

              <Route exact path="/items/item_types" element={<ItemTypes />} />

              <Route exact path='/rooms/add' element={<AddRoom />} />
              <Route exact path='/rooms/edit/:id' element={<EditRoom />} />
              <Route exact path="/rooms" element={<ShowRooms />} />

              <Route exact path="/rooms/room_types" element={<RoomTypes />} />

            </Routes>
            <Footer />

          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
