const inquirer = require("inquirer");


const mysql = require("mysql");
const connection = mysql.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "employeesDB"
});

function add() {
    return inquirer
        .prompt({
            type: "list",
            message: "Which would you like to add?",
            choices: ["New Department", "New Role", "New Employee"],
            name: "addWhat"
        })
        .then(function (answer) {

            if (answer.addWhat === "New Department") {
                return newDepartment();
            } else if (answer.addWhat === "New Role") {
                return newRole();
            } else {
                return newEmployee();
            }
        })
};

function newEmployee() {
    let questions = [{
        type: "input",
        message: "Please enter the employee's first name:",
        name: "firstName"
    }, {
        type: "input",
        message: "Please enter the employee's last name:",
        name: "lastName"
    }];
    return inquirer
        .prompt(questions)
        .then(function (answer) {
            let firstName = answer.firstName;
            let lastName = answer.lastName;

            return new Promise(function (resolve, reject) {
                connection.query("SELECT id, title FROM roles", function (err, res) {
                    if (err) return reject(err);
                    console.log(" ");
                    console.table(res);

                    resolve(inquirer
                        .prompt({
                            type: "rawlist",
                            message: "Please select the ID that matches the employee's role:",
                            choices: function () {
                                let choicesArr = [];
                                for (let i = 0; i < res.length; i++) {
                                    choicesArr.push(res[i].id);
                                }
                                return choicesArr;
                            },
                            name: "roleId"
                        })
                        .then(function (ans) {
                            let roleId = ans.roleId;
                            return new Promise(function (resolve, reject) {
                                connection.query("select id, first_name, last_name, role_id from employees", function (err, res) {
                                    if (err) return reject(err);
                                    console.log("");
                                    console.table(res);

                                    resolve(inquirer
                                        .prompt({
                                            type: "rawlist",
                                            message: "Please select the new employee's manager by IDS:",
                                            choices: function () {
                                                let choicesArr = [];
                                                for (let i = 0; i < res.length; i++) {
                                                    choicesArr.push({ name: res[i].first_name + " " + res[i].last_name, value: res[i]});
                                                }
                                                return choicesArr;
                                            },
                                            name: "manager"
                                        })
                                        .then(function (ans) {
                                            let managerId = ans.manager.id
                                            return new Promise(function (resolve, reject) {
                                                connection.query(
                                                    `INSERT INTO employees SET ?`,
                                                    {
                                                        first_name: firstName,
                                                        last_name:lastName,
                                                        role_id: roleId,
                                                        manager_id: managerId
                                                    },
                                                    function (err) {
                                                        if (err) return reject(err);
                                                        console.log(`A new employee has been added.`)
                                                        resolve(inquirer
                                                            .prompt({
                                                                type: "confirm",
                                                                message: "Would you like to add another employee?",
                                                                name: "repeat"
                                                            })
                                                            .then(function (answer) {
                                                                if (answer.repeat) {
                                                                    return newEmployee();
                                                                }
                                                            })
                                                        );
                                                    })
                                            })
                                        })
                                    )
                                })
                            })
                        })
                    )

                });
            });
        });
};


function newDepartment() {
    return inquirer
        .prompt({
            type: "input",
            message: "What would you like to name the new department?",
            name: "depName"
        })
        .then(function (ans) {
            let newName = ans.depName;
            return new Promise(function (resolve, reject) {
                connection.query(
                    `INSERT INTO departments SET ?`,
                    {
                        name: newName
                    },
                    function (err) {
                        if (err) return reject(err);
                        console.log(`A new department has been added.`)
                        resolve(inquirer
                            .prompt({
                                type: "confirm",
                                message: "Would you like to add another database?",
                                name: "repeat"
                            })
                            .then(function (answer) {
                                if (answer.repeat) {
                                    return newDepartment();
                                }
                            })
                        )
                    })
            })
        })
};

function newRole() {
    let question = [{
        type: "input",
        message: "What is the role's title?",
        name: "roleTitle"
    }, {
        type: "input",
        message: "Please enter the new role's yearly salary (e.g. 30000.00):",
        name: "roleSalary"
    }];


    return inquirer
        .prompt(question)
        .then(function (ans) {
            let title = ans.roleTitle;
            let salary = ans.roleSalary;
            return new Promise(function (resolve, reject) {
                connection.query("SELECT * FROM departments", function (err, res) {
                    if (err) return reject(err);
                    console.log(" ")
                    console.table(res);
                    let nextQuestion = {
                        type: "input",
                        message: "To which 'Department ID' does this job belong?",
                        name: "depId"
                    }

                    resolve(inquirer
                        .prompt(nextQuestion).then(function (id) {
                            let depId = id.depId;
                            return new Promise(function (resolve, reject) {
                                connection.query(
                                    `INSERT INTO roles SET ?`,
                                    {
                                        title: title,
                                        salary: salary,
                                        department_id: depId
                                    },
                                    function (err) {
                                        if (err) return reject(err);
                                        console.log(`A new role has been added.`)
                                        resolve(inquirer
                                            .prompt({
                                                type: "confirm",
                                                message: "Would you like to add another role?",
                                                name: "repeat"
                                            })
                                            .then(function (answer) {
                                                if (answer.repeat) {
                                                    return newRole();
                                                }
                                            })
                                        )
                                    }
                                )
                            })
                        })
                    )
                })
            })

        });
};

module.exports = add