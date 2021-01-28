// Import the dependencies
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connect to the employeesDB database using a localhost connection
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employes_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("---------------EMPLOYEE TRACKER----------------");
    init();
});

// First prompt 
function init() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role"//,
                // "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Employees By Department":
                    viewByDepartment();
                    break;

                case "View All Employees By Manager":
                    viewByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee":
                    UpdateEmployee();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;
            }
        });
};

function viewEmployees() {
    let query = // TO DO: "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function viewByDepartment() { };


function viewByManager() { };


function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstname",
                type: "input",
                message: "What is the employee's first name",
                validate: (value) => {
                    let isValid = value.match(/^[a-z\s\-]+$/i);
                    if (isValid) {
                        return true;
                    }
                    return "Name missing or invalid! (No numbers or symbols allowed except for dashes)";
                }
            },
            {
                name: "lastname",
                type: "input",
                message: "What is the employee's last name",
                validate: (value) => {
                    let isValid = value.match(/^[a-z\s\-]+$/i);
                    if (isValid) {
                        return true;
                    }
                    return "Name missing or invalid! (No numbers or symbols allowed except for dashes)";
                }
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: [
                    //TO DO: call roles list from DB
                ]
            },
            {
                name: "manager",
                type: "list",
                message: "What is the employee's manager?",
                choices: [
                    //TO DO: call manager list from DB
                ]
            }
        ])
};


function removeEmployee() { };

function UpdateEmployee() { };

function updateManager() { };

function viewAllRoles() { };

function addRole() { };

function removeRole() { };

