//1) import express
import express from "express";

//2) define express
const app = express();
const port = 8000;

//4) To handle requests
app.use("/", (req, res) => {
  res.send(`Hi There, in port ${port}`);
});

//3)open the port
app.listen(port, (error) => {
  error ? console.log(error) : console.log("http://localhost:8000/");
});
