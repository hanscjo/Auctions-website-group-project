const mysql = require("mysql");
const util = require("util");

async function sendQuery(pool, qry) {
  /*This function is an asyncronous function because of the delayed query function used within. 
  
  INPUT: Pool and the MySQL query to be sendt to the database
  
  OUTPUT: A Promise-object with the data recieved from the database as a list of objects: 
  [{obj1_attribute1: value, obj:2attribute2: value}, {obj2_attribute1,obj2_attribute2}, etc...]
  
  If there is an error, the error is thrown.

  When using the Promise-object returned it is important to use it with async-await function syntax*/

  pool.query = util.promisify(pool.query); //Converts query function so that it returns a promise-object

  try {
    const data = await pool.query(qry);
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = sendQuery;
