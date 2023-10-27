import React,{useContext, useState} from 'react'
import NavBar from '../components/NavBar'
import { Text,Box,Input, VStack ,StackDivider,InputGroup,InputRightElement,Button} from '@chakra-ui/react'  
import { useNavigate } from 'react-router-dom'
import "./Page_style.css"
import MyContext from '../context/createContext'
const SignUp = () => {
  const{signup}=useContext(MyContext);
  const nav = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
const[err,setErr]=useState("");
  const [cshow, setCShow] = React.useState(false);
  const ChandleClick = () => setCShow(!cshow);
const[formData,setFormData]=useState({});
const onChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  }
  )
   
}
const onSumbit=async()=>{
  console.log(formData);
   const res= await signup(formData);
   if(res.err){
    setErr(res.err);
   }
   else{
    nav("/login");
   }
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
<Text fontSize='5xl' color={"teal"}>SignUp</Text>
<Text color={"red"}>{err}</Text>
  <Box  h='40px'  >
  <Input name='name' onChange={onChange} placeholder='Name' size='md' />
  </Box>

  <Box  h='40px'  >
  <Input name='phone' onChange={onChange} placeholder='Phone' size='md' />
  </Box>

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
  <Box h='40px' >
  <InputGroup size='md'>
      <Input name='cpassword'onChange={onChange}
        pr='4.5rem'
        type={cshow ? 'text' : 'password'}
        placeholder='Confirm password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={ChandleClick}>
          {cshow ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>

  </Box>
  <Box  textAlign={"center"} display={"flex"} justifyContent={"space-evenly"}>
  <Button onClick={onSumbit} colorScheme='teal'>SignUp</Button>
  <Button onClick={()=>{nav("/login")}}  colorScheme='teal'>Already Have Account</Button>

  </Box>

</VStack>
</div>
    </div>
  )
}

export default SignUp
