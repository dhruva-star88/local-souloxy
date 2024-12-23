import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const location = useLocation();

  // Check if the current path is "message-area"
  const isMessageArea = location.pathname.includes('message-area');

  return (
    <>
      {!isMessageArea && <Navbar />} {/* Only shows Navbar if not on the MessageArea page */}
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
