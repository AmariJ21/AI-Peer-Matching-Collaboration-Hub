const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
import pool from './db.js';

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_url,
});

pool.query('SELECT NOW()', (err, res) => {
  if(err) console.error(err);
  else console.log('DB connected:', res.rows[0]);
});
// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

app.get("/students", async (req, res) => {
  const result = await pool.query("SELECT * FROM students");
  res.json(result.rows);
});

useEffect(() => {
  fetch("/students")
    .then(res => res.json())
    .then(data => console.log(data));
}, []);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
