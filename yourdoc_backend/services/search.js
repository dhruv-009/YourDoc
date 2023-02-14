const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dalapp'
});

// connecting to the database
connection.connect(function (error){
  if(error) throw error;
  console.log("Connected!")
});

// searching doctors by name
const searchName = (name) => {
  const sql = `SELECT * FROM doctor WHERE name LIKE '%${name}%'`;
  connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
  });
};

// calling the functions for the results
searchName('Jay');

// close the database connection
connection.end();