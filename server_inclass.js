// console.log("Hello App Server");
// const addNum = (input) => {
//   return input + 1;
// };
// console.log(addNum(500));
//--------------------------------------------------------------------------
//commonjs Syntax:
// const express = require("express");

//express module:
import express from "express";

//import fs module
import fs from "fs";
const app = express();
const port = 3000;

//fill resuest body: use middleware
app.use(express.json());

//create get request, first path
app.get("/", (request, response) => {
  response.send("<h1>Hello World! to the Client using h1</h1>");
});

//another endpoint+sendFile
app.get("/home", (req, res) => {
  //   res.send("Hello World! in /home");
  res.sendFile(
    "C:/Users/MacaLopez/Documents/DentedCode/DentedCode - Node/New folder/home.html"
  );
});

//writeFile
app.get("/writeFile", (req, res) => {
  let personObject = {
    name: "Lopezzz",
    age: 50,
  };

  //write the person obeject to file test.json
  //fs module:
  fs.writeFileSync("synctest.json", JSON.stringify(personObject)); //create the fije.json
  res.send("Write File"); //answer to browser
});

//readFile
app.get("/readFile", (req, res) => {
  let data = JSON.parse(fs.readFileSync("synctest.json"));
  data.name = "test";
  res.send(data);
});

//API FOR USERS
//fetch/read user data
app.get("/v1/users", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data/users.json"));
  //read data/users.json

  res.send(data);

  //go to: http://localhost:3000/v1/users
});

//CREATE USER DATA
//post request
app.post("/v1/users", (req, res) => {
  //request body
  console.log(req.body);

  let name = "Sam";
  let age = 60;
  //   let newData = {
  //     id: 4,
  //     name: "Sam",
  //     age: 60,
  //   };
  let newData = {
    name: req.body.name,
    age: req.body.age,
  };

  //read file to get type of data
  let userData = JSON.parse(fs.readFileSync("data/users.json"));

  //id of new item
  newData.id = userData[userData.length - 1].id + 1;
  //add new data
  userData.push(newData); //only in memory userData is updated

  //write the data
  fs.writeFileSync("data/users.json", JSON.stringify(userData));

  //   res.send("user addedd");
  res.status(201).send("user addedd");
});

//UPDATE
//patch request ":id, means paramenter variable!!!"
app.patch("/v1/users/:userid", (req, res) => {
  let updateAge = req.body.age;

  let id = req.params.userid;

  let userData = JSON.parse(fs.readFileSync("data/users.json"));

  //find user with id
  let user = userData.find((item) => item.id == id);

  //update age
  user.age = updateAge;

  //write the updated data
  //write the data
  fs.writeFileSync("data/users.json", JSON.stringify(userData));

  res.send("user updated");
});

//DELETE
app.delete("/v1/users/:userid", (req, res) => {
  let id = req.params.userid; //i'm getting a string FROM PARAMS

  let userData = JSON.parse(fs.readFileSync("data/users.json"));

  // filter out the user with the given id
  let filteredData = userData.filter((item) => item.id !== parseInt(id));

  // overwrite the JSON file
  fs.writeFileSync("data/users.json", JSON.stringify(filteredData));

  res.send("user deleted");
});

//server start, one port for application, example: here use port=3000 port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//--------------------------------------------------------------------------
//import every object was exported in mymodule.js
// const importedObj = require("./mymodule.js");
// console.log(importedObj.addNum(10));

// const { addNum, addNum2 } = require("./mymodule.js");
// console.log(addNum2(12));

//TYPE: "modules" in jason.package
// import escript from "./mymodule2.js";
// console.log(escript.addNum(100));

//or
// import { addNum, addNum2 } from "./mymodule2.js";
// console.log(addNum(100));

//or
// import { addNum, addNum2 } from "./mymodule2.js";
// import defaultObj from "./mymodule2.js";

// console.log(addNum(12));
// console.log(addNum2(12));
// console.log(defaultObj(12));
