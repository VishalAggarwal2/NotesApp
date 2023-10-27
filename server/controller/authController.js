const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// path for veifying jwt token
const verify =async(req,res)=>{
  try{
if(!req.body.token){
throw Error("token not found")
}
else{
  console.log("enter")
const verify = await jwt.verify(req.body.token,"vishalaggarwal270@gmail.com",(err,data)=>{
  if(err){
    res.json({messgae:"issue in verify"});
  }
    if(data){
      res.json({
message:"verified user",
        status: true
       })
    }
  
})
}
  }catch(e){
    res.json({
      message: "issue at verifying data",
      err:e.message,
      status: false
     })
  }
}



const regsiter=async(req,res)=>{
  try{
//checking where user exist orr not
if(!req.body.password||!req.body.name||!req.body.email||!req.body.cpassword||!req.body.phone){
  throw Error("Fill All The Data CareFully");
  return
}
if(req.body.password!=req.body.cpassword){
  throw Error("Password Not Match");
  return

}
else{

const  query= "SELECT * from user WHERE email =?";
await db.query(query,[req.body.email],async(err,data)=>{
  try{
    if(err){
      throw Error("isue ALREADY EXIST");
    }
    if(data.length){
      throw new  Error("USER ALREADY EXIST");
    }
    //hasing the password
    const password =  await bcrypt.hash(req.body.password,10);
    console.log(password);
    // saving the details of the user when it does not exist
    const q2 = "INSERT INTO user(`name`,`email`,`password`,`phone`) VALUES (?)";
    const values = [req.body.name,req.body.email,password,req.body.phone];
  await db.query(q2,[values],(err,data)=>{
    try{
      if(err){
        throw Error("Issueeeeee in Signup");
      }
      else{
        res.json({
          message: "User Saved Succ",
          data: data
        })
      }
    }catch(e){
      res.json({
        message: "issue at geting data",
        err:e.message
       })
    }
 
  })
  }catch(e){
    res.json({
      message: "issue at geting data",
      err:e.message
     })
  }


})}
  }catch(e){
 res.json({
  message: "issue at geting data",
  err:e.message
 })
  }

}
const login=async(req,res)=>{
try{
const {email,password}= req.body;
if(!email||!password){
  throw Error("Fill All The Data Carefully");
}
else{
  // check wheatcher user exist or not
  const q ="SELECT * FROM user WHERE email =?";
  db.query(q,[req.body.email],async(err,data)=>{
    try{
      if(err){throw Error("Issue In Login")}
      if(data.length==0){throw Error("User Does Not Exist ")}
      else{
        const get_password= data[0].password;
         // checking where user password matches orr not
         const IsCompare = await bcrypt.compare(req.body.password,get_password);
         console.log(IsCompare);
         if(!IsCompare){
          throw Error("Invalid Credential");
         }
         // creating The jwt token and sending in the cookie
         const expirationTimestamp = Math.floor(Date.now() / 1000) + 3600; // 3600 seconds = 1 hour

         const token = await jwt.sign({id: data[0].id},"vishalaggarwal270@gmail.com",{expiresIn:expirationTimestamp});
         console.log(data[0].id);
         console.log(token);
         
 res.cookie("token",token).json({
  message: "user Found Succ",
  data: data,
  token:token
 })
      }
    }catch(e){
      res.json({
        message: "issue at geting data",
        err:e.message
       })
    }
  
  })
}
}catch(e){
  res.json({
    message: "issue at geting data",
    err:e.message
   })
}
}
module.exports ={regsiter,login,verify}