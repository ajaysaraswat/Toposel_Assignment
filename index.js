require("dotenv").config();
const express = require("express");
const { connecttoMongoDB } = require("./connection");
const userRouter = require("./routes/user");

const { restrictedtouserloginonly } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 6000;
const url = process.env.MONGO_URL;

connecttoMongoDB(`${url}`);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
