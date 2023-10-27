import React,{useContext, useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import { Textarea,Box,Text, Input,Button } from '@chakra-ui/react'
import MyContext from '../context/createContext';
const CreateNotes = () => {
  const nav = useNavigate();
const[fomdata,setFormData]=useState({});
const[err,setErr]=useState("");
const[mess,setMess]=useState("");
const{token,add,verify}=useContext(MyContext);
const check_user=async()=>{
  if(!(await verify())){

    nav("/login");
  }
 }

useEffect(()=>{
check_user();
},[])
  const handleInputChange = (e) => {
setFormData({
  ...fomdata,
  token:token,
  [e.target.name]:e.target.value
})
  }
  const onSumbit =async()=>{
    const res= await add(fomdata);
    console.log(res);
    if(res.err){
      setErr(res.err);
      setMess(null);
    }
    if(res.data){
      setMess(res.message);
      setErr(null);
    }
  }
  return (
    <div>
      <NavBar></NavBar>
      {err?<p style={{color:"red"}}>{err}</p>:<p style={{color:"green"}}>{mess}</p>}
      <Box   textAlign={"start"} width={"70%"}
      margin={"auto"} marginTop={"2rem"}>
         <Text  marginTop={"1rem"}  mb='8px'>Title: </Text>
    <Input onChange={handleInputChange} name="title" placeholder='Title'></Input>
 <Text  marginTop={"1rem"}  mb='8px'>Dsc:</Text>
      <Textarea
        name="dsc"
        onChange={handleInputChange}
        placeholder='Notes Dsc'
        size='sm'
      />
          <Text marginTop={"1rem"} mb='8px'>Category: </Text>
    <Input name='cat' onChange={handleInputChange} placeholder='Category'></Input>
    <Box marginTop={"1rem"} textAlign={"center"}>
    <Button onClick={onSumbit} colorScheme='teal'>AddNotes</Button>

    </Box>

      </Box>

    </div>
  )
}

export default CreateNotes
