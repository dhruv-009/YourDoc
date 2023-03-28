import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import './index.css';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import { Appointment } from './pages/Appointment/Appointment';
import { Profile } from './pages/Profile/Profile';
import { ThemeContext, ToastContext, ToastDefaultValue } from './contexts/contexts';
import { Toast } from './components/Toast/Toast';
// import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/signup",
    element: <SignUp />,
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
    path: "/appointment/:doctorId",
    element: <Appointment />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [toastState, setToastState] = useState(ToastDefaultValue);
  const showToastFor5s = ({ toastText, toastTitle, toastType }) => {
    setToastState(s => ({ toastText, toastTitle, toastType, isShowToast: true }));
    setTimeout(() => setToastState(s => ({ ...s, isShowToast: false })), 5000);
  };
  const toggleIsLightTheme = () => setIsLightTheme((s) => !s);
  const { toastText, toastTitle, toastType, isShowToast } = toastState;

  return <ThemeContext.Provider value={{ isLightTheme, toggleIsLightTheme }}>
    <CookiesProvider>
      <ToastContext.Provider value={{ ...toastState, showToastFor5s }}>
        <div className={isLightTheme ? '' : 'dark'}>
          <RouterProvider router={router} />
          {isShowToast
            ? <Toast text={toastText} title={toastTitle} type={toastType} />
            : null
          }
        </div>
      </ToastContext.Provider>
      </CookiesProvider>
  </ThemeContext.Provider>
}