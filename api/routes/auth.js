const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const sendQuery = require("../database");
const bcrypt = require("bcryptjs");
const generateValuelist = require("../helpfunctions").generateValuelist;
let server = require("../../server"); //get pool-connection from server
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//authenticate users when logging in
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let sqlquery =
    'SELECT email,password FROM users WHERE email="' + email + '";';
  let response = await sendQuery(server.pool, sqlquery);

  if (response.length === 0) {
    return res.status(400).send("Invalid email ");
  }
  const validPassword = await bcrypt.compare(password, response[0].password);
  if (!validPassword) {
    return res.status(400).send("Invalid passord");
  }

  sqlquery = 'SELECT * FROM users WHERE email="' + email + '";';
  let user = await sendQuery(server.pool, sqlquery);
  user = JSON.parse(JSON.stringify(user[0]));
  console.log(user);
  const token = jwt.sign(user, config.get("jwtPrivateKey"));
  res.send(token);
});

module.exports = router;
