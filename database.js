var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : ''
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;

//CREATE TABLE Videos ( id INT NOT NULL AUTO_INCREMENT,name CHAR(255) NOT NULL, brand CHAR(255) NOT NULL, published TIMESTAMP NOT NULL, count INT DEFAULT 0, PRIMARY KEY (id));
