const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({  
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Baruch2021',
  database: 'ManagementDB'
})

const mainQuestions = [
  "View Employee", 
  "View Role", 
  "View Department", 
  "Add Employee", 
  "Add Role", 
  "Add Department", 
  "Update Employee Role", 
  "Exit!"
]


const viewTable = (table) => {
  connection.query("SELECT * FROM ??", table, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

const viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

const viewDepartment = () => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}


const addDepartment = async () => {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "name"
      }
    ])
    connection.query("INSERT INTO departments (department) VALUES ?", {name:name}, ((err,res) => {
      if (err) throw err;
      console.log(`A new Department with the name ${name} has been created?`)
      init();
    }))
}

const addRole = async () => {
  const { title, salary } = inquirer.prompt([
    {
      type: "input",
      message: "What role would you like to add",
      name: "title"
    },
    {
      type: "input",
      message: "What is the salary of this role?",
      name: "salary"
    }
  ])
  salary = parseFloat(salary).toFixed(2);
  const depoTable = getTable("departments");
}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}

const init = async () => {
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userChoice",
      choices: mainQuestions
    }
  ])
  switch (userChoice) {
    case "Add Employee":
      addEmployee();
      break;
    case "Add Role":
      addRole();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "View Employee":
      viewTable("employees");
      break;
    case "View Role":
      viewTable("roles");
      break;
    case "View Department":
      viewTable("departments");
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      break
    case "Exit!":
      connection.end();
  }
}

connection.connect((err) => {
  if (err) throw err;
  console.log('connect')
  init();
});

