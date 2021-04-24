import React from "react";
import "./Transaction.css";

const transaction = props => {
  /*This is an example of how to recieve data from the server.
   Props now have the following properties: 
   seller : "full name of seller"
   sellerEMail
   buyer : "full name of buyer"
   buyerEmail
   product : title of the transaktion product
   price : the agreed price on product
   isSeller : 0 or 1 dependent on if the logged in user is the seller or not(to customize how the data is displayed)
   */

  const seller = props.isSeller ? props.seller : "Deg selv";
  return (
    <p>
      {props.seller} selger sin {props.product} til {props.buyer} for{" "}
      {props.price} kroner{" "}
    </p>
  );
};

export default transaction;
