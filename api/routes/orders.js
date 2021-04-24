//Here we add all the functions for usershandling
const express = require("express");
const router = express.Router();
const sendQuery = require("../database");
let server = require("../../server"); //get pool-connection from server
const generateValuelist = require("../helpfunctions").generateValuelist;
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//oppdatere bruker-rating, kan forsåvidt ligge i users.js også
router.post("/updateRating", async (req, res) => {
  const ratingUserID = req.body.state.userID; //Hentes fra login
  const orderID = req.body.state.orderID; //Følgende tre verdier hentes fra et returnert order-objekt(brukeren har liste)
  const buyerID = req.body.state.buyerID;
  const sellerID = req.body.state.sellerID;
  const ratingValue = req.body.state.ratingValue; //+1 eller -1

  var ratingUserType = "";
  var ratedUserType = "";
  var ratedUserID = 0;

  if (ratingUserID === buyerID) {
    ratingUserType = "Buyer";
    ratedUserType = "Seller";
    ratedUserID = sellerID;
  } else {
    ratingUserType = "Seller";
    ratedUserType = "Buyer";
    ratedUserID = buyerID;
  }

  const sqlquery =
    "UPDATE orders SET ratedBy" +
    ratingUserType +
    " = 1 WHERE orderID = " +
    orderID +
    "; UPDATE user SET rating = rating + " +
    ratingValue +
    "WHERE userID = " +
    ratedUserID +
    ";";

  await sendQuery(server.pool, sqlquery);

  res.send("Updated user-ratings where the rated user = " + ratedUserType);
});

//hente relevante orders
router.get("/myOrders", async (req, res) => {
  const userID = req.query.userID;

  const sqlquery =
    "SELECT \
  CONCAT(buyer.firstName,' ',buyer.lastName) AS buyer,\
  buyer.email as buyerEmail,\
  buyer.userID as buyerID,\
  CONCAT(seller.firstName,' ',seller.lastName) AS seller,\
  seller.email as sellerEmail,\
  seller.userID as sellerID,\
  products.title AS product ,\
  products.highestBid AS price , \
  products.productID AS productID,\
  IF(seller.userID=" +
    userID +
    ",0,1) as isSeller \
  FROM orders as o \
  INNER JOIN users as buyer ON o.buyerID=buyer.userID \
  INNER JOIN users as seller ON o.sellerID=seller.userID\
  INNER JOIN products ON o.productID=products.productID WHERE seller.userID=" +
    userID +
    " OR buyer.userID=" +
    userID +
    ";";
  orders = await sendQuery(server.pool, sqlquery);
  for (i = 0; i < orders.length; i++) {
    orders[i] = JSON.parse(JSON.stringify(orders[i]));
  }
  res.send(orders);
});

module.exports = router;
