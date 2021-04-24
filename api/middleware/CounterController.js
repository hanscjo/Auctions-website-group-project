const Counter = require("./Counter");
const sendQuery = require("../database");

class CounterController {
  constructor(pool) {
    this.counters = [];
    this.pool = pool;
    this.initCounters();
  }
  async initCounters() {
    const sqlquery =
      "SELECT productID,sellerID,highestBidder,endDate from products ;";
    const products = await sendQuery(this.pool, sqlquery);
    for (let i = 0; i < products.length; i++) {
      if (products[i].endDate > new Date().getTime()) {
        this.counters.push(new Counter(products[i].productID, this.pool));
      }
    }
  }
  addCounter(productID) {
    this.counters.push(new Counter(productID, this.pool));
  }
  updateCounter(productID) {
    let counter = this.counters.find(c => c.productID === productID);
    counter.deleteCounter();
    this.counters = this.counters.filter(c => c.productID === productID);
    this.addCounter(productID);
  }
}
module.exports = CounterController;
