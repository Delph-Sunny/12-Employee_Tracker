const inquirer = require("inquirer");

const mainMenu = {
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
};

module.exports = mainMenu;