const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post('/createvideo', function (req, res) {

    var sql = "INSERT INTO Videos (name, brand,published) VALUES (?,?,?)";

    var date = req.query.year+"-"+req.query.month+"-"+req.query.day;

    var queryData = [req.query.name, req.query.brand,date]
    connection.query(sql, queryData, function (error, results, fields) {
      if (error) throw error;
      res.send('Video inserted successfully');
      console.log('Video inserted sucessfully');
    });
});

app.post('/trackview', function (req, res) {

    //track video view so as long as there is a value in the video table that has an id that matches the one we inputted
    var sql = "INSERT INTO Views (videoid, viewdate) SELECT ?, ? FROM Videos WHERE id = ?";

    var today = new Date();
    var date = today.getFullYear()+"-"+today.getMonth()+1+"-"+today.getDate();

    var queryData = [req.query.videoid, date,req.query.videoid]
    connection.query(sql, queryData, function (error, results, fields) {
      if (error) throw error;
      //if none of the rows are affected by the query we tell the user just that
      else if(results.affectedRows == 0){
        res.send('There is no video with that id');
        console.log("There is no video with that id");
      }
      else{
      res.send('View tracked successfully');
      console.log('View tracked sucessfully');
    }
    });
});

app.get('/getreport/:videoid/:date?', function (req, res) {

  var sql;
  var queryData;

  //if we have a date var in our query we return a record that has videos.name, videos.brand and videos.published columns in addition to a column that shows the number of view objects that have the same videos
  //id as our selected video. We are also only taking into account the views that occured on or after the given date
  if(req.params.date) {
    sql = "SELECT Videos.name, Videos.brand, Videos.published, COUNT(Views.videoid) AS count FROM Videos INNER JOIN Views ON Videos.id = Views.videoid AND Videos.id = ? AND Views.viewdate >= ?";
    queryData = [req.params.videoid, req.params.date]
  }

//Same as the previous clause except that date is not taken into context
  else{
      sql = "SELECT Videos.name,Videos.brand, Videos.published, COUNT(Views.videoid) AS count FROM Videos INNER JOIN Views ON Videos.id = Views.videoid AND Videos.id = ?";
      queryData = req.params.videoid;
  }


    connection.query(sql, queryData, function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });

});



app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', 3000);
app.listen(3000, function() {
    console.log('Server is running on port 3000...');
});
