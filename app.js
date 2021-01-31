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
    console.log("/n---------------EMPLOYEE TRACKER----------------/n");
    init();
});

// First prompt 
function init() {  // OK
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
                "View Budget By Department",
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

                case "View Budget By Department":
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
            }
        });
};

// View all Employees and details
function viewEmployees() {  // OK
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, "
    query += "CONCAT(m.first_name, ' ' , m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id "
    query += "INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("\n");
        init();
    });
};

// Select manager to filter out employees
function viewByManager() {  // OK but ugly
    let managerList = []; managerNames = [];
    let query1 = "SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e INNER JOIN employee AS m ON e.manager_id = m.id";
    connection.query(query1, function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            managerList.push({ id: res[i].id, name: res[i].manager });
            managerNames.push(res[i].manager);
        }
        //console.log(managerList); // FOR TESTING           
        // console.log(managerNames); // FOR TESTING 
        inquirer
            .prompt({
                name: "manager",
                type: "list",
                message: "Select the manager: ",
                choices: managerNames
            })
            .then((answer) => {
                // get the ID of selected manager
                let managerID;
                for (i = 0; i < managerList.length; i++) {
                    if (answer.manager == managerList[i].name) {
                        managerID = managerList[i].id;
                    }
                }
                const query2 = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary AS salary, CONCAT(m.first_name, ' ' ,  m.last_name) AS manager
            FROM employee AS e
            LEFT JOIN employee AS m ON e.manager_id = m.id
            INNER JOIN role ON e.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            WHERE e.manager_id = ${managerID}`;

                connection.query(query2, (err, res) => {
                    if (err) throw err;
                    console.log("\n");
                    console.table(res); // Display result
                    console.log("\n");
                    init();
                });
            });
    });
};

// List all departments
function viewDepartments() {  // OK
    let query = "SELECT id as ID, name AS DEPARTMENT FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// TO CONFIRM: Employees with roles or just roles list?
function viewRoles() {  // WORKING
    let query = "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function viewBudget() { };

// Add new employee, a role or a department
function addEmployee() {  // TO DO
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

function addRole() {  // BROKEN
    let deptObject;
    let query1 = "SELECT department.id AS deptID, department.name AS dept FROM department";
    connection.query(query1, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].name);
        }

    });

    /*
        let query2 = "SELECT role.title AS title, role.salary AS salary FROM role";
        connection.query(query2, function (err, res) {
            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter the new role name: ",
                    validate: (value) => {
                        let isValid = value.match(/^[a-z0-9\s\-]+$/i);
                        if (isValid) {
                            return true;
                        }
                        return "Role name missing or invalid! (No symbols allowed except for dashes)";
                    }
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Enter the salary for this role: ",
                    validate: (value) => {
                        let isValid = value.match(/^[0-9\s]+$/i);
                        if (isValid) {
                            return true;
                        }
                        return "Salary missing or invalid! (No symbols allowed)";
                    }
                },
                {
                    name: "department",
                    type: "list",
                    message: "Enter the department of this role?",
                    choices: deptObject.name
                }
            ]).then(function (res) {
                let query3 = "INSERT INTO role SET ?"
                connection.query(query3,
                    {
                        title: res.title,
                        salary: res.salary,
                        department_id: 1
                    }, (err)=>{
                        if (err) throw err
                        console.table(res);
                        init();
                    });
            });
        });
    
    
        /*
            inquirer
                .prompt([{
                    name: "title",
                    type: "input",
                    message: "Enter the new role name: ",
                    validate: (value) => {
                        let isValid = value.match(/^[a-z0-9\s\-]+$/i);
                        if (isValid) {
                            return true;
                        }
                        return "Role name missing or invalid! (No symbols allowed except for dashes)";
                    }
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Enter the salary for this role: ",
                    validate: (value) => {
                        let isValid = value.match(/^[0-9\s]+$/i);
                        if (isValid) {
                            return true;
                        }
                        return "Salary missing or invalid! (No symbols allowed)";
                    }
                },
                {
                    name: "department",
                    type: "list",
                    message: "Enter the department of this role?",
                    choices: deptObject.name
                }])
                .then((answers) => {
                    for (let i = 0; i < deptObject.length; i++) {
                        if (deptObject[i].name === answers.department) { deptID = deptObject[i].id }
                    };
                        let query2 = "INSERT INTO role (title, salary, department_id) VALUES(?,?,?)";
        
                    connection.query(query2, [answers.title, answers.salary, deptID], (err, res) => {
                        if (err) throw err;
                        console.log(`/nNew role ${answers.title} added!/n`);
                        init();
                    });
                });*/
};

function addDepartment() {  // OK
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

