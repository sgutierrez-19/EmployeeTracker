const inquirer = require("inquirer");
const mysql = require("mysql");
const keepGoing = require("./keepGoing");


const connection = mysql.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "employeesDB"
});

function view() {
    return inquirer
        .prompt({
            type: "list",
            message: "Which would you like to view?",
            choices: ["Departments", "Roles", "Employees"],
            name: "whichDB"
        })
        .then(function (answer) {
            let database = answer.whichDB;
            return new Promise(function (resolve, reject) {
                connection.query(`SELECT * FROM ${database}`, function (err, res) {
                    if (err) return reject(err);
                    console.table(res);
                    resolve(inquirer
                        .prompt({
                            type: "confirm",
                            message: "Would you like to view another database?",
                            name: "repeat"
                        })
                        .then(function (answer) {
                            if (answer.repeat) {
                                return view();
                            }
                        })
                    );
                })
            })
        })
}

module.exports = view