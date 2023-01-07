import React, {useState} from 'react';
import { ReactDOM } from 'react-dom/client';
import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import {Routes, Route} from "react-router-dom"
import { Router } from '@mui/icons-material';
import {BrowserRouter, NavLink} from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ):( 
        <div className="app__body">
        <BrowserRouter>
          <Sidebar/>
          <Routes>
            <Route path="/" element={""} />
            <Route path="/rooms/:roomID" element={<Chat/>} />
          </Routes>
        </BrowserRouter>  
      </div>
    )}
    </div>
  );
}

export default App;

