import React, { Component } from "react";
import "./Transactions.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Transaction from "./Transaction/Transaction";

class Transactions extends Component {
  state = {
    transactions: []
  };

  componentDidMount = () => {
    //henter transaksjoner for brukeren ved et endpoint som JSON-objekter med ID hentet fra json-token
    this.callbackendAPI()
      .then(res => {
        this.setState({ transactions: res });
      })
      .catch(err => console.log(err));
  };
  callbackendAPI = async () => {
    const userID = jwtDecode(localStorage.getItem("token")).userID;
    const response = await axios.get("/api/orders/myOrders?userID=" + userID);
    if (response.status !== 200) {
      throw Error(response.status);
    }
    return response.data;
  };

  render() {
    const personalTransactions = this.state.transactions.map(transaction => (
      <li>
        <Transaction
          buyer={transaction.buyer}
          buyerEmail={transaction.buyerEmail}
          seller={transaction.seller}
          sellerEmail={transaction.sellerEmail}
          product={transaction.product}
          price={transaction.price}
          isSeller={transaction.isSeller}
        />
      </li>
    ));

    return (
      <div>
        <ul>
          {this.state.transactions.length ? (
            personalTransactions
          ) : (
            <p>Ingen handler enda!</p>
          )}
        </ul>
      </div>
    );
  }
}

export default Transactions;
