//1) import express
import express from "express";

//2) define express varivle and execute the express
const app = express();
const PORT = 8000;

//4) To handle requests
// app.use("/", (req, res) => {
//   res.send(`Hi There, in port ${PORT}`);
// });

//5) get from Server: READ
// app.get("/", (req, res) => {
//   res.send("Hi");
// });

//6)Send file->do pwd
app.get("/", (req, res) => {
  res.sendFile(
    "/Users/MacaLopez/Documents/DentedCode/DentedCode - Node/NewNode/home.html"
  );
});

//3)open the port
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`http://localhost:${PORT}`);
});
