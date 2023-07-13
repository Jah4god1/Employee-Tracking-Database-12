const inquirer = require('inquirer');
const connection = require('./connection');

function start() {
    inquirer
    .prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Exit',
    ],
    })
    .then((answer) => {
    switch (answer.action) {
    case 'View all departments':
    viewAllDepartments();
    break;
    case 'View all roles':
    viewAllRoles();
    break;
    case 'View all employees':
    viewAllEmployees();
    break;
    case 'Add a department':
    addDepartment();
    break;
    // case 'Add a role':
    // addRole();
    // break;
    // case 'Add an employee':
    // addEmployee();
    // break;
    // case 'Update an employee role':
    // updateEmployeeRole();
    // break;
    case 'Exit':
    connection.end();
    break;
    default:
    console.log('Invalid choice. Please try again.');
    start();
    break;
    }
    });
    }
function viewAllDepartments() {
        const query = 'SELECT * FROM departments';
        connection.query(query, (err, res) => {
        if (err) throw err;
        
        console.table(res);
        start();
        });
        }
function viewAllRoles(){
const query = 'SELECT * FROM role';
connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
        start();
        });
    
        }
function viewAllEmployees(){
    const query = 'SELECT * FROM employees';
connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
        start();
        });

}
function addDepartment(){
    inquirer
    .prompt({
        name: 'departments',
        type: 'input',
        message: 'Enter the name of the department:',})
        .then((answer) => {
            const query = 'INSERT INTO departments (name) VALUES (?)';
            connection.query(query, {name:
            answer.departments},(err)=> {
                if(err) throw err;

                console.log('Department added successfully!');
                start();
            });
        });
    

}
connection.connect((err) => {
if (err) throw err;

console.log('Connected to the database!');
start();
});