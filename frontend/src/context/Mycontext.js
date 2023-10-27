import React, { useState,useContext,useEffect } from "react";
import MyContext from "./createContext";
import { useNavigate } from "react-router-dom";
const Mycontextprovider=({children})=>{

    const [data, setData] = useState("Initial Value");
    const[user,setUser]=useState(JSON.parse(localStorage.getItem("user"))||null);
const [token,setToken]=useState( user?user.token:null);
const[notes,setNotes]=useState([]);
const[err,setErr]=useState("");
useEffect(()=>{
console.log("geting user here",user);
console.log("geting token here",token);
        localStorage.setItem("user", JSON.stringify(user));


},[user])

// login
const login=async(object)=>{
    console.log("call")
const response = await fetch("http://localhost:3000/api/auth/login",{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify(object),
})
const json_data = await response.json();
console.log(json_data);
if(json_data.token){
    setToken(json_data.token);
}
if(json_data.err){
  setErr(json_data.err);
}
setUser(json_data);

}
const signup=async(data)=>{
console.log("hello");
try{
const response = await fetch("http://localhost:3000/api/auth/register",{
  
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify(data),

})
  const resp= await response.json();
  console.log(resp);
  return resp;
}catch(e){

}

}



// geting all the notes
const getNotes=async()=>{
    const response = await fetch("http://localhost:3000/api/notes/find",{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({token: token}),
    })
  const json = await response.json();
  if(json.data){
    setNotes([...json.data]);

  }
console.log(notes)
}

//verify
const verify =async()=>{

    const response = await fetch("http://localhost:3000/api/auth/verify",{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({token: token}),
    })
const json= await response.json();
console.log("enter here");
console.log(json.status);
return json.status
}


//logout
const logout=()=>{
    localStorage.setItem("user",null)
    setUser(null);
    setToken(null)

}
// ading the notes
const add=async(obj)=>{
  const response = await fetch("http://localhost:3000/api/notes/add",{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify(obj),
})
const json = await response.json();
console.log("add notes");

  return json

}
const[dark,setDark]=useState(false);
const obj = {data,dark,setDark,login,add,setNotes,logout,user,verify,getNotes,notes,signup,token,err}
    return (
        <MyContext.Provider value={obj}>
      {children}
    </MyContext.Provider>
    )
}
export default  Mycontextprovider