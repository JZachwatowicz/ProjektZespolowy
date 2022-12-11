import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar, Footer } from './components';
import {
  Home, Login, Profile, About, Contact, News, RoomTypes, AddUser, EditUser, EditUserAddress, ShowUsers, EditAddress, EditProfile,
  ShowDeprtments, AddDepartment, EditDepartment, ShowDescriptions, AddDescription, AddActivity, EditActivity, ShowActivities,
  EditItem, AddItem, ShowItems, ItemTypes, EditRoom, AddRoom, ShowRooms, Schedule, EditSchedule, AddSchedule
} from './pages';
import './App.css'

import { useStateContext } from './services/ContextProvider';

//import ShowSchedules from './pages/Schedule/ShowSchedules'



const App = () => {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } = useStateContext();

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
            className={`dark:bg-main-dark-bg bg-main-bg w-full' 
             ${activeMenu ? 'md:ml-72' : 'flex-2'}`
            }
          >
            <Routes>

              <Route path="/" element={<Navigate to="/home" />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/news" element={<News />} />



              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/profile/edit" element={<EditProfile />} />
              <Route exact path="/profile/editaddress" element={<EditAddress />} />
              <Route exact path="/login" element={<Login />} />


              <Route exact path="/descriptions" element={<ShowDescriptions />} />
              <Route exact path="/descriptions/add" element={<AddDescription />} />

              <Route exact path="/schedule" element={<Schedule />} />
              <Route exact path="/booking" element={<Schedule />} />
              <Route exact path="/users" element={<ShowUsers />} />
              <Route exact path="/users/add" element={<AddUser />} />
              <Route exact path="/users/edit/:id" element={<EditUser />} />
              <Route exact path="/users/editaddress/:id" element={<EditUserAddress />} />

              <Route exact path='/activities/add' element={<AddActivity />} />
              <Route exact path='/activities/edit/:id' element={<EditActivity />} />
              <Route exact path="/activities" element={<ShowActivities />} />

              <Route exact path='/items/add' element={<AddItem />} />
              <Route exact path='/items/edit/:id' element={<EditItem />} />
              <Route exact path="/items" element={<ShowItems />} />

              <Route exact path="/schedule" element={<Schedule />} />
              <Route exact path='/schedule/add' element={<AddSchedule />} />
              <Route exact path='/schedule/edit/:h_id/:s_id' element={<EditSchedule />} />


              <Route exact path="/items/item_types" element={<ItemTypes />} />

              <Route exact path='/rooms/add' element={<AddRoom />} />
              <Route exact path='/rooms/edit/:id' element={<EditRoom />} />
              <Route exact path="/rooms" element={<ShowRooms />} />

              <Route exact path="/rooms/room_types" element={<RoomTypes />} />

              <Route exact path="/departments" element={<ShowDeprtments />} />
              <Route exact path="/departments/add" element={<AddDepartment />} />
              <Route exact path="/departments/edit/:id" element={<EditDepartment />} />

            </Routes>
            <Footer />

          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
