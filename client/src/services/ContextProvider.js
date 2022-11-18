import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const setMode = () => {
    setCurrentMode(currentMode === "Light" ? "Dark" : "Light");
    localStorage.setItem('themeMode', currentMode === "Light" ? "Dark" : "Light");
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('font-size', fontSize + 'px')
  }, [fontSize])

  return (
    <StateContext.Provider
      value={
        { setFontSize, currentColor, showEmployeeBoard, setShowEmployeeBoard, currentUser, setCurrentUser, currentMode, activeMenu, showAdminBoard, setShowAdminBoard, screenSize, setScreenSize, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
