const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "username",
  host: "localhost",
  password: "password",
  database: "art_gallery_database",
});

app.get("/states", (req, res) => {
  db.query("SELECT stateName FROM state", (err, result) => {
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
    [stateName, stateAb],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(5000, () => {
  console.log("server running");
});
