import React, { useContext } from 'react'
import { Card, CardHeader, Heading,Text,CardBody, Button,CardFooter,Box } from '@chakra-ui/react'
import "./Page_style.css"
import MyContext from '../context/createContext'


const NotesInd = (props) => {
  const{token}=useContext(MyContext);
  
  return (
    <Box className='' maxWidth={"50%"} alignContent={"center"}>
       <Card  border={"solid black" } background={"lightblue"} color={"blue"}>
    <CardHeader>
      <Heading   color={"black"} size='md'> { props.title}</Heading>
    </CardHeader>
    <CardBody>
      <Text>
        {
         props.dsc
        }
        </Text>
      <Text>
     Ctaegory:-   {
         props.cat
        }
        </Text>

    </CardBody>
    <CardFooter>
      <Button onClick={()=>{props.deletee(props.id)}}>Delete</Button>
    </CardFooter>
  </Card>
    </Box>
  )
}

export default NotesInd
