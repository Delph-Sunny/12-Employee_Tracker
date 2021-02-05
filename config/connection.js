// Import the dependencies
const mysql = require("mysql");
const dotenv = require("dotenv").config();


// Connect to the employeesDB database using a localhost connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees_db"
})



module.exports = connection;