import React, { useReducer, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import 'tw-elements';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import { Appointment } from './pages/Appointment/Appointment';
import { ThemeContext } from './contexts/themeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/appointment",
    element: <Appointment />,
  },
]);

export function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const toggleIsLightTheme = () => setIsLightTheme((s) => !s)

  return <ThemeContext.Provider value={{ isLightTheme, toggleIsLightTheme }}>
    <div className={isLightTheme ? '' : 'dark'}>
      <RouterProvider router={router} />
    </div>
  </ThemeContext.Provider>
}