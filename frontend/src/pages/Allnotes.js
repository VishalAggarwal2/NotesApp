import React, { useContext,useEffect,useState } from 'react'
import NavBar from '../components/NavBar'
import MyContext from '../context/createContext'
import { useNavigate } from 'react-router-dom'
import "./Page_style.css"
import NotesInd from './NotesInd'
const Allnotes = () => {
    const nav = useNavigate();

    const {verify,getNotes,dark,setDark,notes,token,setNotes,searchval}=useContext(MyContext);

    const check_user=async()=>{
        if(!(await verify())){
      
          nav("/login");
        }
       }




       const deletee=async(id)=>{

        const obj={
          token:token,
          idd:id
        };
              const response = await fetch("http://localhost:3000/api/notes/delete",{
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },  
                body: JSON.stringify(obj),
            })
            const json = await response.json();
            console.log("add notes");



            

const newarr= notes.filter((e)=>{
  return e.id!=id
})

setNotes([...newarr])
              return json;
            
        
          }
useEffect(()=>{

    check_user();
    getNotes();
},[])



  return (
    <div className='mainpage'>
        <NavBar></NavBar>
        <div className='notes'>
        {
    notes.map((e)=>{
 return <NotesInd id={e.id} deletee={deletee} title={e.title} dsc={e.dsc} cat={e.category}></NotesInd>

    })
}
        </div>

    </div>
  )
}

export default Allnotes
