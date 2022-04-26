const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "art_gallery_database",
});
app.post("/customers", (req, res) => {
  const stateName = req.body.stateName;
  let query = "SELECT customer.* FROM customer JOIN state";
  query += " ON customer.stateAb = state.stateAb WHERE state.stateName = (?)";
  db.query(query, [stateName], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/update", (req, res) => {
  const { stateName, stateAb, option } = req.body;
  let query = "UPDATE state ";
  query += "SET stateName = (?), stateAb = (?) ";
  query += "WHERE stateName = (?)";
  db.query(query, [stateName, stateAb, option], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values updated");
    }
  });
});
app.get("/states", (req, res) => {
  db.query("SELECT * FROM state", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const stateName = req.body.stateName;
  const stateAb = req.body.stateAb;
  db.query(
    "INSERT INTO state VALUES (?,?)",
    [stateAb, stateName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/delete", (req, res) => {
  const stateName = req.body.stateName;
  db.query(
    "DELETE FROM state WHERE stateName = (?)",
    [stateName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Record Deleted");
      }
    }
  );
});

app.listen(5000, () => {
  console.log("server running");
});
