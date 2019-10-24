DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO department(name)
VALUES("Conventional - onsite");

INSERT INTO role(title, salary, department_id)
VALUES("Property Manager", 80000.00, 123);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Steven", "Gutierrez", 321, 432);