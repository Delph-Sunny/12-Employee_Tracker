// Import the dependencies
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connect to the employeesDB database using a localhost connection
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("---------------EMPLOYEE TRACKER----------------/n");
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
                "View All Employees By Manager",
                "View All Departments",
                "View All Roles",
                "View budget By Department",
                new inquirer.Separator(),
                "Add Employee",
                "Add Role",
                "Add Department",
                new inquirer.Separator(),
                "Update Role",
                "Update Employee Manager",
                new inquirer.Separator(),
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                new inquirer.Separator(),
                "Exit",
                new inquirer.Separator()
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Employees By Manager":
                    viewByManager();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "View budget By Department":
                    viewBudget();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Update Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "Remove Department":
                    removeDepartment();
                    break;

                case "Exit":
                    connection.end();
                    console.log("Exiting program...");
                    process.exit();
                    break;
            }
        });
};

// View all Employees and details
function viewEmployees() {
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, "
    query += "CONCAT(m.first_name, ' ' , m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id "
    query += "INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function viewByManager() { };

// List all departments
function viewDepartments() {
    let query = "SELECT id as ID, name AS DEPARTMENT FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// TO CONFIRM: Employees with roles or just roles?
function viewRoles() {
    let query = "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function viewBudget() { };

// Add new employee, a role or a department
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
function addRole() {
    
 };
function addDepartment() {
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "Enter the new department name:",
            validate: (value) => {
                let isValid = value.match(/^[a-z0-9\s\-]+$/i);
                if (isValid) {
                    return true;
                }
                return "Name missing or invalid! (No symbols allowed except for dashes)";
            }
        })
        .then((answer) => {
            let query = "INSERT INTO department SET ?";
            connection.query(query, { name: answer.deptName }, (err, res) => {
                if (err) throw err;
                console.log(`\nThe department ${answer.deptName} was added!\n `);
                init();
            });
        });
};

function updateRole() { };
function updateManager() { };

function removeEmployee() { };
function removeRole() { };
function removeDepartment() { };

