DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO departments(name)
VALUES("Conventional - onsite");

INSERT INTO roles(title, salary, department_id)
VALUES("Property Manager", 80000.00, 123);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES("Steven", "Gutierrez", 321, 432);