import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
const [fontSize, setFontSize] = useState(1);

  const setMode = () => {
    setCurrentMode(currentMode==="Light" ? "Dark" : "Light");
    localStorage.setItem('themeMode', currentMode==="Light" ? "Dark" : "Light");
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };


  return (
    <StateContext.Provider 
      value={
        { currentColor, currentMode, activeMenu, screenSize,fontSize, setFontSize ,setScreenSize, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
