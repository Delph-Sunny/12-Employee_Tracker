# 12-Employee_Tracker
  

 <a href="https://img.shields.io/badge/node-v12.19.0-orange?style=plastic"><img alt="Node.js use" src="https://img.shields.io/badge/node-v12.19.0-orange?style=plastic"/></a>
<a href="https://img.shields.io/badge/npm-Inquirer-red?style=plastic"><img alt="npm package Inquirer" src="https://img.shields.io/badge/npm-Inquirer-red?style=plastic" /></a>
<a href="https://img.shields.io/badge/npm-MySQL-yellow?style=plastic"><img alt="MySQL" src="https://img.shields.io/badge/npm-MySQL-yellow?style=plastic"/></a>
<a href="https://img.shields.io/badge/npm-console.table-blue?style=plastic"><img alt="console.table" src="https://img.shields.io/badge/npm-console.table-blue?style=plastic"/></a>
<a href="https://img.shields.io/badge/npm-asciiart--logo-yellowgreen?style=plastic"><img alt="asciiart-logo" src="https://img.shields.io/badge/npm-asciiart--logo-yellowgreen?style=plastic"/></a>
 <a href="https://img.shields.io/badge/License-MIT-brightgreen?style=plastic"><img alt="M.I.T. License use" src="https://img.shields.io/badge/License-MIT-brightgreen?style=plastic"/></a>  

---

## Table of Contents  
* [Description](#Description)
* [User Story and Details](#User-Story-and-Details)  
* [Installation and Usage](#Installation-and-Usage)  
* [Images of the app](#Images-of-the-app-)  
* [Future Development](#Future-Development)
* [License](#License)  
* [Contact](#Contact) 


## Description
This command-line application is a **C**ontent **M**anagement **S**ystems: it allows you to view and manage the departments, roles, and employees in a company. It uses [inquirerJs](https://www.npmjs.com/package/express), [MySQL](https://www.npmjs.com/package/mysql),  [console.table](https://www.npmjs.com/package/console.table) and [asciiart-logo](https://www.npmjs.com/package/asciiart-logo).  


## User Story and Details


```
User Story Acceptance Criteria
```
```
AS a business owner, I want to be able to view and manage the departments, roles,  
and employees in my company
SO that I can organize and plan my business by adding, updating, deleting employees or managers,  
and viewing employees by managers.

```

:information_source:  
The database schema should contain:  
* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager. 



## Installation and Usage  

- Open a terminal instance  
- Clone the following [repo](https://github.com/Delph-Sunny/12-Employee_Tracker)  
- In the working directory, install the dependencies package with the following code line `npm i`  
- Create the employee_db with employeeDB.sql. [^1]
- Once the dependencies have been installed and the database created, enter `npm start`  
- Follow the instruction for each of the following 14 functions:
  - *View All Employees*
  - *View All Employees By Manager*
  - *View All Departments*              
  - *View All Roles*
  - *View Budget By Department*
  - *Add Employee*
  - *Add Role*
  - *Add Department*
  - *Update Employee Role*
  - *Update Employee Manager*
  - *Remove Employee*
  - *Remove Role*
  - *Remove Department*
  - *Exit*
  

## Images of the App :mag:  

Screenshot of the app starting screen:  
![Employee_Tracker](./images/Snippet1.PNG) 

:movie_camera: The full movie showing the functionality of the application can be found [here](https://drive.google.com/file/d/1KtZNt4bHzUTk7CSmuGFbbxoV55NaIFl5/view). 
  
## Future Development 

- Refactor some queries and functions to make them more sustainable with less duplicate code lines.
- Add a function to modify the employee complete set of data
- Add error checks to prevent duplicate entries. Currently there are only basic checks to prevent crashes when a table is empty or data not available. 

## License  

Copyright (c) 2021 DT. This project is [MIT](https://choosealicense.com/licenses/mit) licensed.

## Contact  

:octocat:  GitHub: [Delphine](https://github.com/Delph-Sunny)  


---
[^1]: Use `seeds.sql` to populate your database with data if you do not have any. 