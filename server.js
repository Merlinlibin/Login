const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;
