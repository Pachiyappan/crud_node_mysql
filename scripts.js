var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "user@123",
  database: "sampleDB",
});

var jsonParser = bodyParser.json();

connection.connect((error) => {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected");
  }
});

app.get("/peoples", (req, res) => {
  connection.query("select *  from biodata", (error, rows, fields) => {
    if (!!error) {
      console.log("Error on query");
    } else {
      res.send(rows);
    }
  });
});

app.get("/peoples/:id", (req, res) => {
  connection.query(
    "select * from biodata where id=?",
    [req.params.id],
    (error, rows, fields) => {
      if (!!error) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/peoples", jsonParser, (req, res) => {
  connection.query(
    `insert into biodata(name , age , address) values(? ,? ,?)`,
    [req.body.name, req.body.age, req.body.address],
    (error) => {
      if (!!error) {
        console.log(error);
      } else {
        res.send("Created Successfully");
      }
    }
  );
});

app.post("/peoples/:id", jsonParser, (req, res) => {
  let query = "update biodata set name=? , age=? , address=? where id=?";
  let data = [req.body.name, req.body.age, req.body.address, req.params.id];
  connection.query(query, data, (error) => {
    if (!!error) {
      console.log(error);
    } else {
      res.send("Updated Successfully");
    }
  });
});

let port = 8080;
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
