import React, { useContext } from 'react';
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import MyContext from '../context/createContext';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHome,faLightbulb } from '@fortawesome/free-solid-svg-icons';

import "./components_style.css"

const NavBar = () => {
  const nav = useNavigate();
  const { logout, dark,setDark,token} = useContext(MyContext);

  const style ={
  "display":"flex",
    "backgroundColor":  dark?"black":"white",
    "padding": "20px",
"color":  dark?"white":"black",
    "justifyContent": "spaceBetween",

}

  return (
    <div className='nav flex' style={{
      display:"flex",
      backgroundColor:  dark?"black":"white",
     color:  dark?"white":"black",
justifyContent:"space-evenly",
     padding: "20px",
    }}>
      <div className="mask-target">
        Notes
      </div>
      <ul className='nav_ul flex row'>
        {
          token ? (
            <>
              <NavLink to='/notes'>
                
                <li>Notes</li>
              </NavLink>
              <NavLink to="/login" onClick={() => { logout(); }}>
                <li>Logout</li>
              </NavLink>
              <NavLink to='/createnotes'>
                <li>CreateNotes</li>
              </NavLink>
              <div onClick={()=>{
                setDark((pre)=>{ return !pre})
              }}>
              {

dark?<FontAwesomeIcon color='green' icon={faLightbulb} />: <FontAwesomeIcon color='red'  icon={faLightbulb} />
}
              </div>
       

            </>
          ) : (
            <>
              <NavLink to='/login'>
                <li>Login</li>
              </NavLink>
              <NavLink to='/register'>
                <li>Signup</li>
              </NavLink>

              <div onClick={()=>{
                setDark((pre)=>{ return !pre})
              }}>
              {

dark?<FontAwesomeIcon color='green' icon={faLightbulb} />: <FontAwesomeIcon color='red'  icon={faLightbulb} />
}
              </div>
            </>
          )
        }
      
      </ul>

     
    </div>
  )
}

export default NavBar;
