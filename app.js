// Import the dependencies
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require("asciiart-logo");
let i;

// Connect to the employeesDB database using a localhost connection
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees_db"
})

connection.connect((err) => {
    if (err) throw err;
    console.clear(); // Clear Terminal
    /**** Logo of the app ****/
    console.log(
        logo({
            name: "EMPLOYEE TRACKER",
            font: "Big",
            lineChars: 8,
            padding: 2,
            margin: 3,
            borderColor: "bold-grey",
            logoColor: "bold-green"
        })
            .render()
    );
    init(); // Launch app menu
});

// App menu 
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
                "Update Employee Role",
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
        .then((answer) => {
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

                case "Update Employee Role":
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
    let query = "SELECT e.id AS ID, e.first_name AS 'FIRST NAME', e.last_name AS 'LAST NAME', role.title AS TITLE, department.name "
    query += "AS DEPARTMENT, role.salary AS SALARY, CONCAT(m.first_name, ' ' , m.last_name) AS MANAGER FROM employee AS e LEFT JOIN employee AS m "
    query += "ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {     // Check if list exists
            console.log("The employee list is empty. Nothing to display.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            console.log("\n");
            console.table(res);
            // Pause 3s
            setTimeout(() => {
                init();
            }, 3000);
        };
    });
};

// Select manager to filter out employees view
function viewByManager() {  // OK
    let managerList = []; managerNames = [];
    let query1 = "SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e INNER JOIN employee AS m ON e.manager_id = m.id";
    connection.query(query1, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {     // Check if list exists
            console.log("The manager list is empty. Nothing to display.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            res.forEach((val) => {
                managerList.push({ id: val.id, name: val.manager });
                managerNames.push(val.manager);
            });
            inquirer
                .prompt({
                    name: "manager",
                    type: "list",
                    message: "Select the manager: ",
                    choices: managerNames  // List of all current managers
                })
                .then((answer) => {
                    // get the ID of selected manager
                    let managerID;
                    for (i = 0; i < managerList.length; i++) {
                        if (answer.manager == managerList[i].name) {
                            managerID = managerList[i].id;
                        };
                    };

                    const query2 = `SELECT e.id AS ID, e.first_name AS 'FIRST NAME', e.last_name AS 'LAST NAME', role.title AS TITLE, 
                    department.name AS DEPARTMENT, role.salary AS SALARY, CONCAT(m.first_name, ' ' ,  m.last_name) AS MANAGER FROM employee AS e 
                    LEFT JOIN employee AS m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department 
                    ON role.department_id = department.id WHERE e.manager_id = ?`;

                    connection.query(query2, managerID, (err, res) => {
                        if (err) throw err;
                        console.log("\n");
                        console.table(res); // Display result
                        // Pause 3s
                        setTimeout(() => {
                            init();
                        }, 3000);
                    });
                });
        };
    });
};

// List all departments
function viewDepartments() {  // OK
    let query = "SELECT id as ID, name AS DEPARTMENT FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {     // Check if list exists
            console.log("The employee list is empty. Nothing to display.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            console.log("\n");
            console.table(res);     // Display result
            // Pause 3s
            setTimeout(() => {
                init();
            }, 3000);
        };
    });
};

// List all roles
function viewRoles() {  // OK 
    let query = "SELECT id AS ID, title AS TITLE FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {     // Check if list exists
            console.log("The role list is empty. Nothing to display.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            console.log("\n");
            console.table(res); // Display result        
            // Pause 3s
            setTimeout(() => {
                init();
            }, 3000);
        };
    });
};

function viewBudget() {  // OK
    let deptBudgetList = [];
    // Group departments and sum salaries 
    let query = "SELECT d.name, SUM(r.salary) AS budget FROM employee AS e LEFT JOIN role AS r ";
    query += "ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id GROUP BY d.name";
    connection.query(query, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {     // Check if list exists
            console.log("The lists are empty. Nothing to display.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            res.forEach((val) => {
                deptBudgetList.push({ DEPARTMENT: val.name, BUDGET: val.budget });
            });
            console.log("\n");
            console.table(deptBudgetList);
            // Pause 3s
            setTimeout(() => {
                init();
            }, 3000);
        };
    });
};

// Add new employee with details
function addEmployee() {  // OK
    // Get the manager list
    let managerList = []; managerNames = [];
    let query1 = "SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e ";
    query1 += "INNER JOIN employee AS m ON e.manager_id = m.id";
    connection.query(query1, (err, res) => {
        if (err) throw err;
        res.forEach((val) => {
            managerList.push({ id: val.id, name: val.manager });
            managerNames.push(val.manager);
        });
        // Get the role list
        let roleList = []; roleTitles = [];
        let query2 = "SELECT role.id AS id, role.title AS title FROM role";
        connection.query(query2, (err, res2) => {
            if (err) throw err;
            res2.forEach((val) => {
                roleList.push({ id: val.id, title: val.title });
                roleTitles.push(val.title);
            });
            inquirer
                .prompt([
                    {
                        name: "firstname",
                        type: "input",
                        message: "Enter the employee's first name: ",
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
                        message: "Enter the employee's last name: ",
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
                        message: "Choose the employee's role: ",
                        choices: roleTitles  // List of all current roles
                    },
                    {
                        name: "manager",
                        type: "list",
                        message: "Choose the employee's manager: ",
                        choices: managerNames  // List of all current managers
                    }
                ]).then((answer) => {
                    // Find the role ID of the answer
                    let roleID;
                    for (i = 0; i < roleList.length; i++) {
                        if (answer.role == roleList[i].title) {
                            roleID = roleList[i].id;
                        };
                    };
                    // Find the manager ID of the answer
                    let managerID;
                    for (i = 0; i < managerList.length; i++) {
                        if (answer.manager == managerList[i].name) {
                            managerID = managerList[i].id;
                        };
                    };
                    // Add new employee and all details to DB
                    let query3 = "INSERT INTO employee SET ?"
                    connection.query(query3,
                        {
                            first_name: answer.firstname,
                            last_name: answer.lastname,
                            role_id: roleID,
                            manager_id: managerID
                        }, (err) => {
                            if (err) throw err
                            console.log(`${answer.firstname} ${answer.lastname} was added.\n`);
                            // Pause 1s
                            setTimeout(() => {
                                init();
                            }, 1000);
                        });
                });
        });
    });
};

// Add new role and its salary within a department
function addRole() {  // OK
    // Get the list of departments
    let deptList = []; deptNames = [];
    let query1 = "SELECT department.id AS deptID, department.name AS dept FROM department";
    connection.query(query1, (err, res) => {
        if (err) throw err;
        res.forEach((val) => {
            deptList.push({ id: val.deptID, name: val.dept });
            deptNames.push(val.dept);
        });
        // Prompt for new role info
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
                message: "Choose the department of this role:",
                choices: deptNames      // List of all current departments
            }
        ]).then((answer) => {
            // Find the department ID for the answer
            let deptID;
            for (i = 0; i < deptList.length; i++) {
                if (answer.department == deptList[i].name) {
                    deptID = deptList[i].id;
                };
            };
            // Add new role and all details to DB
            let query2 = "INSERT INTO role SET ?"
            connection.query(query2,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: deptID
                }, (err) => {
                    if (err) throw err
                    console.log(`${answer.title} was added to the department ${answer.department}.\n`);
                    // Pause 1s
                    setTimeout(() => {
                        init();
                    }, 1000);
                });
        });
    });
};

// Add new department
function addDepartment() {  // OK
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "Enter the new department name: ",
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
                console.log(`The department ${answer.deptName} was added!\n`);
                // Pause 1s
                setTimeout(() => {
                    init();
                }, 1000);
            });
        });
};

// Update employee role
function updateRole() {     // OK
    let roleList = [], roleTitles = [], employeeList = [], employeeNames = [];
    let employeeIDSelected, roleIDSelected;
    // Get the employee list
    let query1 = "SELECT id, CONCAT(first_name, ' ', last_name) AS name, role_id FROM employee";
    connection.query(query1, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {   // Check for empty exists
            console.log("The employee list is empty. Nothing to update.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            res.forEach((val) => {
                employeeList.push({ id: val.id, name: val.name, role_id: val.role_id });
                employeeNames.push(val.name);
            });
            inquirer
                .prompt([
                    {
                        name: "fullName",
                        type: "list",
                        message: "Choose the employee to update: ",
                        choices: employeeNames  // List of all current employees
                    }
                ]).then((answer) => {
                    // Find employee ID of selected employee name                
                    for (i = 0; i < employeeList.length; i++) {
                        if (answer.fullName == employeeList[i].name) {
                            employeeIDSelected = employeeList[i].id;
                        };
                    };
                    // Get the role list
                    let query2 = "SELECT role.id AS id, role.title AS title FROM role";
                    connection.query(query2, (err, res2) => {
                        if (err) throw err;
                        res2.forEach((val) => {
                            roleList.push({ id: val.id, title: val.title });
                            roleTitles.push(val.title);
                        });
                        inquirer.prompt([
                            {
                                name: "title",
                                type: "list",
                                message: `Choose a new role for ${answer.fullName}: `,
                                choices: roleTitles // List of all current roles
                            }
                        ]).then((answer2) => {
                            // Find the role ID for the answer
                            for (i = 0; i < roleList.length; i++) {
                                if (answer2.title == roleList[i].title) {
                                    roleIDSelected = roleList[i].id;
                                };
                            };
                            // Update employee role in DB
                            let query3 = `UPDATE employee SET role_id=${roleIDSelected} WHERE id=${employeeIDSelected}`
                            connection.query(query3, (err) => {
                                if (err) throw err
                                console.log("Role updated.\n");
                                // Pause 1s
                                setTimeout(() => {
                                    init();
                                }, 1000);
                            });
                        });
                    });
                });

        };

    });
};

// Update employee manager
function updateManager() {  // 
    let employeeList = [], employeeNames = [], managerNames = [];
    let employeeIDSelected, newManagerID;
    let employeeNameSelected, currentManager;
    // Get the employee list
    let query1 = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, e.manager_id, ";
    query1 += "CONCAT(m.first_name, ' ' ,  m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id ";
    connection.query(query1, (err, res) => {
        console.log(res)  // FOR TESTING
        if (err) throw err;
        if (res.length == 0) {   // Check for empty exists
            console.log("The employee list is empty. Nothing to update.\n");
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            res.forEach((val) => {
                employeeList.push({ id: val.id, name: val.name, manager_id: val.manager_id, manager: val.manager });
                employeeNames.push(val.name);
                managerNames.push(val.manager);
            });
            //Remove any null value in manager list
            managerNames = managerNames.filter((e) => {
                return e != null;
            });
            //Remove any duplicate values in manager list
            managerNames = managerNames.filter((e, index, self) => {
                return self.indexOf(e) === index;
            });

            console.log(managerNames)  // FOR TESTING

            inquirer
                .prompt([
                    {
                        name: "fullName",
                        type: "list",
                        message: "Choose the employee to update: ",
                        choices: employeeNames  // List of all current employees
                    }
                ]).then((answer) => {
                    // Find employee ID of selected employee name and the current manager               
                    for (i = 0; i < employeeList.length; i++) {
                        if (answer.fullName == employeeList[i].name) {
                            employeeIDSelected = employeeList[i].id;
                            employeeNameSelected = answer.fullName;
                            if ((employeeList[i].manager !== null) || (managerNames !== null)) {
                                currentManager = employeeList[i].manager;
                                console.log(`The current manager of ${employeeNameSelected} is ${currentManager}.`);
                                // New list of managers by filtering out the selected employee 
                                managerNames = managerNames.filter((e) => {
                                    return e != employeeNameSelected;
                                });
                                console.log("list mana",managerNames);  //FOR TESTING
                                inquirer
                                    .prompt([
                                        {
                                            name: "anotherManager",
                                            type: "list",
                                            message: "Choose another manager: ",
                                            choices: managerNames  // List of all current managers
                                        }
                                    ]).then((answer2) => {
                                        // Find manager ID of selected manager name 
                                        console.log("anotherMan", answer2.anotherManager);                                                    
                                        for (let j = 0; j < employeeList.length; j++) {
                                            if (answer2.anotherManager == employeeList[j].manager) {
                                                newManagerID = employeeList[j].manager_id;
                                                console.log("newmanID", newManagerID)  // FOR TESTING 
                                            };
                                        };
                                    });
                            } else {
                                console.log(`${employeeNameSelected} does not have a current manager.`);
                                // New list of employees by filtering out the selected employee
                                employeeNames = employeeNames.filter((e) => {
                                    return e != employeeNameSelected;
                                });
                                inquirer
                                    .prompt([
                                        {
                                            name: "newManager",
                                            type: "list",
                                            message: "Choose a new manager: ",
                                            choices: employeeNames  // List of all current employees without the current employee to update
                                        }
                                    ]).then((answer3) => {
                                        // Find manager ID of selected manager name  
                                        console.log("newMan", answer3.newManager);
                                        for (let j = 0; j < employeeList.length; j++) {
                                            if (answer3.newManager == employeeList[j].name) {
                                                newManagerID = employeeList[j].id;
                                            };
                                        };
                                    });
                            };
                        };
                    };
                    console.log("managerID", newManagerID)  // FOR TESTING
                    console.log("employeeID", employeeIDSelected)  // FOR TESTING
                    // Add new manager info to DB
                  /*          let query2 = `UPDATE employee SET manager_id=${newManagerID} WHERE id=${employeeIDSelected}`
                            connection.query(query2, (err) => {
                                    if (err) throw err
                                    console.log(`${newManager.department_id} is the new manager of ${employeeNameSelected}.\n`);
                                    // Pause 1s
                                    setTimeout(() => {
                                        init();
                                    }, 1000);
                                });
        */
                });
        };
    });
};

// Delete an employee
function removeEmployee() {  // OK
    let employeeList = [], employeeNames = [];
    let employeeIDSelected;
    // Get the employee list
    let query1 = "SELECT id, CONCAT(first_name, ' ', last_name) AS name, role_id, manager_id FROM employee";
    connection.query(query1, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {   // Check for empty exists
            console.log("The employee list is empty. Nothing to remove.\n")
            // Pause 1s
            setTimeout(() => {
                init();
            }, 1000);
        } else {
            res.forEach((val) => {
                employeeList.push({ id: val.id, name: val.name, role_id: val.role_id, manager_id: val.manager_id });
                employeeNames.push(val.name);
            });
            inquirer
                .prompt([
                    {
                        name: "fullName",
                        type: "list",
                        message: "Choose the employee to remove: ",
                        choices: employeeNames  // List of all current employees
                    }
                ]).then((answer) => {
                    // Find employee ID of selected employee name                
                    for (i = 0; i < employeeList.length; i++) {
                        if (answer.fullName == employeeList[i].name) {
                            employeeIDSelected = employeeList[i].id;
                        };
                    };
                    // Get the role list
                    let query2 = `DELETE FROM employee WHERE id=${employeeIDSelected}`;
                    connection.query(query2, (err) => {
                        if (err) throw err;
                        console.log(`${answer.fullName} has been deleted from the list.\n`);
                        // Pause 1s
                        setTimeout(() => {
                            init();
                        }, 1000);
                    });
                });
        };
    });
};

function removeRole() { };
function removeDepartment() { };

