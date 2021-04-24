sendQuery = require("./database");

generateValuelist = valueArray => {
  //INPUT: array of values
  //OUTPUT: string with format "(value1,value2,value3,....)"
  let sqlquery = "(";
  for (let i = 0; i < valueArray.length; i++) {
    if (typeof valueArray[i] === "string") {
      sqlquery += '"' + valueArray[i] + '"';
    } else {
      sqlquery += valueArray[i];
    }
    if (i < valueArray.length - 1) {
      sqlquery += ",";
    } else {
      sqlquery += ");";
    }
  }
  return sqlquery;
};

addOrder = async (
  pool,
  buyerID,
  sellerID,
  productID,
  ratedByBuyer,
  ratedBySeller
) => {
  const valueList = [buyerID, sellerID, productID, ratedByBuyer, ratedBySeller];
  let sqlquery =
    "INSERT INTO orders (buyerID, sellerID, productID, ratedByBuyer, ratedBySeller) VALUES ";
  sqlquery = sqlquery + generateValuelist(valueList);
  await sendQuery(pool, sqlquery);
};
module.exports.generateValuelist = generateValuelist;
module.exports.addOrder = addOrder;
