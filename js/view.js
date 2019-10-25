const inquirer = require("inquirer");
const mysql = require("mysql");

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

            switch (database) {
                case "Departments": 
                    return viewDepartment();
                case "Roles": 
                    return viewRoles();
                case "Employees": 
                    return viewEmps();
            }
        })
}

module.exports = view

function viewEmps() {
    return new Promise(function (resolve, reject) {
        connection.query(`
        Select employees.id, employees.first_name, employees.last_name, roles.title, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id;
        `, function (err, res) {
            if (err) return reject(err);
            console.table(res);

            let question = {
                type: "confirm",
                message: "Would you like to view another database?",
                name: "repeat"
            }
            resolve(inquirer
                .prompt(question)
                .then(function (answer) {
                    if (answer.repeat) {
                        return view();
                    }
                }
                )
            )
        })
    } )
}

function viewRoles() {
    return new Promise(function (resolve, reject) {
        connection.query(`
        Select roles.title, roles.salary, departments.name AS Department
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id;
        `, function (err, res) {
            if (err) return reject(err);
            console.table(res);

            let question = {
                type: "confirm",
                message: "Would you like to view another database?",
                name: "repeat"
            }
            resolve(inquirer
                .prompt(question)
                .then(function (answer) {
                    if (answer.repeat) {
                        return view();
                    }
                }
                )
            )
        })
    } )
};

function viewDepartment() {
    return new Promise(function (resolve, reject) {
        connection.query(`
        Select departments.name AS \`department name\`, roles.title AS position
        FROM departments
        LEFT JOIN roles ON departments.id = roles.department_id;
        `, function (err, res) {
            if (err) return reject(err);
            console.table(res);

            let question = {
                type: "confirm",
                message: "Would you like to view another database?",
                name: "repeat"
            }
            resolve(inquirer
                .prompt(question)
                .then(function (answer) {
                    if (answer.repeat) {
                        return view();
                    }
                }
                )
            )
        })
    } )
};