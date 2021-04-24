const sendQuery = require("../database");
const addOrder = require("../helpfunctions").addOrder;

class Counter {
  constructor(productID, pool) {
    this.startTimer(productID, pool);
    this.timer = null;
    this.productID = productID;
  }
  deleteCounter() {
    console.log("Stopped old bid");
    clearTimeout(this.timer);
  }
  async startTimer(productID, pool) {
    const sqlquery =
      "SELECT productID,sellerID,highestBidder,endDate from products WHERE productID=" +
      productID +
      ";";

    const product = await sendQuery(pool, sqlquery);
    const timeRemaining = product[0].endDate - new Date().getTime();
    this.timer = setTimeout(() => {
      console.log("Transaction inserted");
      addOrder(
        pool,
        product[0].highestBidder,
        product[0].sellerID,
        product[0].productID,
        0,
        0
      );
    }, timeRemaining);
  }
}
module.exports = Counter;
