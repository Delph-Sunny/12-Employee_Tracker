DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;


-- Creates the table "department" within employees_db --
CREATE TABLE department (
  id INT(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)  
);

-- Creates the table "role" within employees_db --
CREATE TABLE role (
  id INT(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)  
);

-- Creates the table "employee" within employees_db --
CREATE TABLE employee (
  id INT(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)  
);


-- SELECTING ALL WHEN CREATING  
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;