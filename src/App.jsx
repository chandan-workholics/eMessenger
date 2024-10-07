import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App
