const db = require("../config/database");
const jwt = require("jsonwebtoken");
// adding the notes
const addNotes=async(req,res)=>{
const token =  req.body.token;
try{
    if(!token){
 throw Error("User Not Verified");
    }
    if(!req.body.title||!req.body.dsc||!req.body.cat){
      throw Error("Fill All The Data CareFully");
    }
    const verify = await jwt.verify(token,"vishalaggarwal270@gmail.com",async(err,data)=>{
        try{
            if(err){
                throw Error("User Not Verified In Jwt");
            }
            // if user is Verified The Sving The Notes
            const query = "INSERT INTO notes(`title`, `dsc`, `category`,`uid`) VALUES (?)"
            const value = [req.body.title,req.body.dsc,req.body.cat,data.id];
            await db.query(query,[value],async(err,data)=>{
                try{
                   if(err){
                    console.log(err)
                    throw Error("Issue In Adding The Notes");
                   }else{
                    res.json({
                        message:"Data Saved Succ",
                        data:data
                    })
                   }
                }catch(e){
                    res.json({
                        message:"Issue In Adding Notes",
                        err:e.message
                    
                    })
                }
            })
        }catch(e){
            res.json({
                message:"Issue In Adding Notes",
                err:e.message
            
            })
        }
       
    })
}catch(e){
    res.json({
        message:"Issue In Adding Notes",
        err:e.message
    
    })
    
}

}

// code for deleting the notes
const deletNotes=async(req,res)=>{
try{
const{idd,token}=req.body;
if(!token){
    throw Error("Not Verified");
}
else{
    const verify =await jwt.verify(token,"vishalaggarwal270@gmail.com",async(err,data)=>{
try{
if(err){
    throw Error("Not Verified");
}
console.log(data);
console.log(data.id);
const query = "DELETE FROM notes WHERE uid=? AND id=?";
await db.query(query,[data.id,idd],(err,data)=>{
    try{
 if(err){
    throw Error("Error Occured");
 }
if(data){
    res.json({
        message:"note delete succ",
        data:data
    })
}

    }catch(e){
        res.json({
            message:"Issue In Deleting Notes",
            error:e.message
        
        })
    }
})
}catch(e){
    res.json({
        message:"Issue In Deleting Notes",
        error:e.message
    
    })
}
    })
}
}catch(e){
 res.json({
        message:"Issue In Deletng Notes",
        error:e.message
    
    })
}
}

// finding the notes of a particular user 
const findNotes=async(req,res)=>{
try{
    const token =  req.body.token;
if(!token){
    throw Error("User Not Verified");
}
else{
    const verify = await jwt.verify(token,"vishalaggarwal270@gmail.com",async(err,data)=>{
try{
   if(err){
    throw Error("User Not autherized")
   }else{
    // finding the notes bases on the uid
    const query ="SELECT * FROM notes WHERE uid =?";
    await db.query(query,[data.id],async(err,data)=>{
  try{
      if(err){
        throw Error("Issue In Geting The Notes");
      }
      else{
        res.json({
            message:"notes geted succ",
            data:data
        })
      }
  }catch(e){
    res.json({
        message:"Issue In Finding Notes",
        error:e.message
    
    })

  }
    })

   }
}catch(e){
    res.json({
        message:"Issue In Finding Notes",
        error:e.message
    
    })
}
    })
}
}catch(e){
    res.json({
        message:"Issue In Finding Notes",
        error:e.message
    
    })
}
}


module.exports={addNotes,deletNotes,findNotes}