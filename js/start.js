const inquirer = require("inquirer");
const view = require("./view");
const add = require("./add");
const updateRole = require("./update");

const mysql = require("mysql");
const connection = mysql.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "employeesDB"
});


function start() {
    console.log(" ");
    inquirer
        .prompt({
            type: "list",
            message: "Welcome to Employee Tracker. What would you like to do?",
            choices: ["View", "Add", "Update", "Exit"],
            name: "action"
        })
        .then(function(answer) {
            if (answer.action === "View") {
                view().then(() => start());
            } else if (answer.action === "Exit") { 
                connection.end()
                return process.exit();
            } else if (answer.action === "Add") {
                add().then(() => start());
            }else {
                updateRole().then(() => start());
            }
        })
};

module.exports = start