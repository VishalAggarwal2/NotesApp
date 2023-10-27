const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser")
const app = express();
app.use(cookie());
const auth = require("./routes/authRoutes");
const notes = require("./routes/notesRoutes");
app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/notes", notes);
app.listen(3000, () => {
  console.log("Server started successfully");
});