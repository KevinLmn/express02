const express = require("express");

require("dotenv").config();

const app = express();

const mysql = require("mysql2/promise");

const port = process.env.APP_PORT ?? 5000;

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DP_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("Welcome to my website");
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const getSchools = (req, res) => {
  database
    .query("select * from school")
    .then(([school]) => {
      res.json(school);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

app.get("/schools", getSchools);
