import React, { useContext, useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Allnotes from './pages/Allnotes';
import CreateNotes from './pages/CreateNotes';
import './App.css';


import { Routes, Route } from 'react-router-dom';
import { extendBaseTheme,extendTheme } from '@chakra-ui/react';
import MyContext from './context/createContext';

const App = () => {
  const{dark,setDark}=useContext(MyContext);
  const containerStyle = {
    backgroundColor:  dark?"white":"black" ,
    color: dark?"black":"white",
    minHeight: '100vh',
  };
  
  return (
   <div style={containerStyle}>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/notes" element={<Allnotes />}></Route>
        <Route path="/createnotes" element={<CreateNotes />}></Route>
      </Routes>
      </div>

  );
};

export default App;
