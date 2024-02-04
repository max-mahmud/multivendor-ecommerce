require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// express app
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// endpoints
// app.use("/api/user", require("./routes/userRoutes"));


const PORT = process.env.PORT || 5000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening for requests
    app.listen(PORT, (req, res) => {
      console.log(`connected to db && server running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });