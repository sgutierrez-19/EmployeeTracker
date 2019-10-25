const mysql = require("mysql");
const start = require("./js/start");

const connection = mysql.createConnection({
    hostname: "localhost",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`
    |------------------------------------------------------------------------------------|
    |     _/_/_/_/                            _/                                         |
    |    _/        _/_/_/  _/_/    _/_/_/    _/    _/_/    _/    _/    _/_/      _/_/    |
    |   _/_/_/    _/    _/    _/  _/    _/  _/  _/    _/  _/    _/  _/_/_/_/  _/_/_/_/   |
    |  _/        _/    _/    _/  _/    _/  _/  _/    _/  _/    _/  _/        _/          |
    | _/_/_/_/  _/    _/    _/  _/_/_/    _/    _/_/      _/_/_/    _/_/_/    _/_/_/     |
    |                          _/                            _/                          |
    |                         _/                        _/_/                             |
    |                                                                                    |
    | _/_/_/_/_/                                _/                                       |
    |    _/      _/  _/_/    _/_/_/    _/_/_/  _/  _/      _/_/    _/  _/_/              |
    |   _/      _/_/      _/    _/  _/        _/_/      _/_/_/_/  _/_/                   |
    |  _/      _/        _/    _/  _/        _/  _/    _/        _/                      |
    | _/      _/          _/_/_/    _/_/_/  _/    _/    _/_/_/  _/                       |
    |------------------------------------------------------------------------------------|
    `)
    start();
});


