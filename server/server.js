require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const connectDb = require("./db");
const userRoutes = require("./routes/user-route");
const express = require("express");
const authRoutes = require("./routes/auth-route");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/login",authRoutes);

const port = process.env.PORT || 8080;

connectDb().then( () => {
    app.listen(port, console.log(`server running on ${port}`))
})
