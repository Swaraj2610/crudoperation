const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "swarajdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});


app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert = "INSERT INTO contact (Name, Email, contact) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("Data saved successfully");
    }
  });
});
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact WHERE id= ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("Data saved successfully");
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const{id}=req.params;
  const sqlGet = "SELECT * FROM contact where id=?";
  db.query(sqlGet, id,(error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const{id}=req.params;
  const {name,email,contact}=req.body;
  const sqlUpdate = "UPDATE contact SET name=?,email=?,contact=? WHERE id=?";
  db.query(sqlUpdate, [name,email,contact,id],(error, result) => {
    if (error) {
      console.error("Error:", error);
      res.send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});
