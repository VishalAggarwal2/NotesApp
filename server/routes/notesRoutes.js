const express = require("express");
const notesRouter = express.Router();
const {addNotes,deletNotes,findNotes}= require("../controller/notesControllers");
notesRouter.post("/add",addNotes)
notesRouter.post("/delete",deletNotes)
notesRouter.post("/find",findNotes)
module.exports=notesRouter