import React,{useContext, useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import "./Page_style.css"
import { useNavigate } from 'react-router-dom'
import { Text,Box,Input, VStack ,StackDivider,InputGroup,InputRightElement,Button} from '@chakra-ui/react'  
import MyContext from '../context/createContext'
const Login = () => {
  const{login,data,user,verify,err}=useContext(MyContext);
 const check_user=async()=>{
  if(await verify()){
    nav("/notes");
  }
 }
  useEffect(()=>{check_user() },[])
  const nav =useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
const[formData,setFormData]=useState({});
const onChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  }
  )
   
}
const onSumbit=()=>{

  login(formData)
}
  return (
    <div>
<NavBar></NavBar>
<div className="login">

<VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='stretch'
>
<Text fontSize='5xl' color={"teal"}>Login</Text>
{

  err?<p style={{color:"red"}}>{err}</p>:""
}
  <Box  h='40px'  >
  <Input name='email' onChange={onChange} placeholder='Email' size='md' />
  </Box>
  <Box h='40px' >
  <InputGroup size='md'>
      <Input name='password'onChange={onChange}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>

  </Box>
  <Box textAlign={"center"} display={"flex"} justifyContent={"space-evenly"}>
  <Button className='hover-target' onClick={onSumbit} colorScheme='teal'>Login</Button>
  <Button  onClick={()=>{nav("/register")}}  colorScheme='teal'>Don't Have Account</Button>
   
  </Box>

</VStack>
</div>
    </div>
  )
}

export default Login
