const mysql = require("mysql");
 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"macbook air",
    database:"notes"
})
module.exports= db