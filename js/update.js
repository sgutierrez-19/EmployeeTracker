const inquirer = require("inquirer");

const mysql = require("mysql");
const connection = mysql.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "employeesDB"
});

// function update() {
//     return inquirer
//         .prompt({
//             type: "list",
//             message: "What would you like to update?",
//             choices: ["Employee's Role", "Employee's Manager"],
//             name: "updateWhat"
//         })
//         .then(function (ans) {
//             if (ans.updateWhat === "Employee's Role") {
//                 return updateRole();
//             } else {
//                 return updateManager();
//             }
//         });
// };

function updateRole() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT id, first_name, last_name, role_id from employees", function (err, res) {
            if (err) return reject(err);
            console.log("---------------------------------------------------------------------")
            console.table(res);
            let employeesArr = [res];

            resolve(inquirer
                .prompt({
                    type: "rawlist",
                    message: "Please select the ID for the employee whose role you would like to change:",
                    choices: function () {
                        let choicesArr = [];
                        for (let i = 0; i < res.length; i++) {
                            choicesArr.push(res[i].id);
                        }
                        return choicesArr;
                    },
                    name: "whichEmp"
                })
                .then(function (ans) {
                    console.log("---------------------------------------------------------------------")
                    let which = ans.whichEmp;
                    let singleEmp = employeesArr[0].find(function (obj) {
                        return obj.id == which;
                    });

                    return new Promise(function (resolve, reject) {
                        connection.query(`SELECT id, title from roles`, function (err, res) {
                            if (err) return reject(err);
                            let currRole = res.find(function (obj) {
                                return obj.id == singleEmp.role_id;
                            })
                            console.log("---------------------------------------------------------------------")
                            console.log(`${singleEmp.first_name} ${singleEmp.last_name}'s current role is ${currRole.title} (ID: ${currRole.id})`)
                            console.table(res);

                            resolve(inquirer
                                .prompt({
                                    type: "list",
                                    message: "Which role would you like to change them to",
                                    choices: function () {
                                        let choicesArr = [];
                                        for (let i = 0; i < res.length; i++) {
                                            choicesArr.push(res[i].id);
                                        }
                                        return choicesArr;
                                    },
                                    name: "whichRole"
                                })
                                .then(function (ans) {
                                    let newRoleId = ans.whichRole;

                                    return new Promise(function (resolve, reject) {
                                        connection.query(
                                            "UPDATE employees SET ? WHERE ?",
                                            [{
                                                role_id: newRoleId
                                            }, {
                                                id: which
                                            }],
                                            function (err, res) {
                                                if (err) return reject(err);
                                                console.log(`${singleEmp.first_name} ${singleEmp.last_name}'s role has been updated!`);
                                                resolve(inquirer
                                                    .prompt({
                                                        type: "confirm",
                                                        message: "Would you like to update another employee's role?",
                                                        name: "repeat"
                                                    })
                                                    .then(function (answer) {
                                                        if (answer.repeat) {
                                                            return updateRole();
                                                        }
                                                    }
                                                    )
                                                )
                                            }
                                        )
                                    }
                                    )
                                }
                                )
                            );
                        }
                        )
                    }
                    )
                }
                )
            )
        }
        )
    }
    )
};

// function updateManager() {
//     return new Promise(function (resolve, reject) {
//         connection.query("SELECT id, first_name, last_name, manager_id from employees", function (err, res) {
//             if (err) return reject(err);
//             console.log("---------------------------------------------------------------------")
//             console.table(res);
//             let employeesArr = [res];

//             resolve(inquirer
//                 .prompt({
//                     type: "rawlist",
//                     message: "Please select the ID for the employee whose manager will be changed:",
//                     choices: function () {
//                         let choicesArr = [];
//                         for (let i = 0; i < res.length; i++) {
//                             choicesArr.push(res[i].id);
//                         }
//                         return choicesArr;
//                     },
//                     name: "whichEmp"
//                 })
//                 .then(function (ans) {
//                     console.log("---------------------------------------------------------------------")
//                     let which = ans.whichEmp;
//                     let singleEmp = employeesArr[0].find(function (obj) {
//                         return obj.id == which;
//                     });
//                     console.log(employeesArr)
//                     return new Promise(function(resolve, reject) {
//                         inquirer
//                             .prompt({
//                                 type: "rawlist",
//                                 message: "Please select a new manager:",
//                                 choices: function () {
//                                     let choicesArr = [];
//                                     for (let i = 0; i < res.length; i++) {
//                                         choicesArr.push(res[i].id);
//                                     }
//                                     return choicesArr;
//                                 },
//                                 name: "whichEmp"
//                             })

//                     })
//                 })
//             )
//         })
//     })
// };


module.exports = updateRole