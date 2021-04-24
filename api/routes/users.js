//Here we add all the functions for usershandling
const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const sendQuery = require("../database");
const generateValuelist = require("../helpfunctions").generateValuelist;
let server = require("../../server"); //get pool-connection from server
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//Gets all users from endpoint /api/users/all
router.get("/all", async (req, res) => {
  const users = await sendQuery(server.pool, "SELECT * FROM users");
  res.send(users);
});

//register new user, use endpoint /api/users/register
router.post("/register", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = parseInt(req.body.phoneNumber);
  const email = req.body.email;
  let password = req.body.password;
  const rating = 0;
  const zipCode = parseInt(req.body.zipCode);
  const streetName = req.body.streetName;
  const isAdmin = 0;

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const userValueArray = [
    firstName,
    lastName,
    phoneNumber,
    email,
    zipCode,
    streetName,
    isAdmin,
    rating,
    password
  ];

  let sqlquery = 'SELECT email FROM users WHERE email="' + email + '";';
  let response = await sendQuery(server.pool, sqlquery);
  if (response.length != 0) {
    return res.status(400).send("User already exist");
  }
  sqlquery =
    "INSERT INTO users (firstName, lastName, phonenumber, email, zipCode, streetName, isAdmin, rating, password) VALUES ";
  sqlquery = sqlquery + generateValuelist(userValueArray);
  await sendQuery(server.pool, sqlquery);
  sqlquery = 'SELECT * FROM users WHERE email="' + email + '";';
  let user = await sendQuery(server.pool, sqlquery);
  user = JSON.parse(JSON.stringify(user[0]));
  const token = jwt.sign(user, config.get("jwtPrivateKey"));
  res.header("x-auth-token", token).send(user);
});

//oppdatere brukerinnstillinger
//dersom en brukerinnstilling ikke er endret, endres ikke variablen i front-end
router.post("/updateUserSettings", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email; //verifiser i front-end at email ikke allerede eksisterer
  const password = req.body.password;
  const zipCode = req.body.zipCode;
  const streetName = req.body.streetName;
  const userID = req.body.userID;

  const sqlquery =
    "UPDATE user SET firstName = " +
    firstName +
    ", lastName = " +
    lastName +
    ", phoneNumber = " +
    phoneNumber +
    ", email = " +
    email +
    ", password = " +
    password +
    ", zipCode = " +
    zipCode +
    ", streetName = " +
    streetName +
    ", WHERE userID = " + userID + ";";

  await sendQuery(server.pool, sqlquery);

  res.send("User updated where email = " + email);
});

//verifisere email
router.get("/returnEmail", async (req, res) => {
  const email = req.body.email;

  const sqlquery = "SELECT * FROM users WHERE email = " + email;

  const emailResult = await sendQuery(server.pool, sqlquery);

  res.send(emailResult);
});

//slette bruker fra systemet
router.delete("/", async (req, res) => {
  const userID = req.query.userID;
  const sqlquery = "DELETE FROM users WHERE userID = " + userID + ";";
  await sendQuery(server.pool, sqlquery);
  res.send("User deleted where userID = " + userID);
});

//Hente en bruker
router.post("/returnUser", async (req, res) => {
  const userID = req.body.userID;

  const sqlquery = "SELECT * FROM users WHERE userID = " + userID + ";";

  const userResult = await sendQuery(server.pool, sqlquery);

  res.send(userResult);
});


module.exports = router;
