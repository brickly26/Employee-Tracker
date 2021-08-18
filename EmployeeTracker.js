const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({  
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Baruch2021',
  database: 'management'
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

const getTable = (table) => {
  connection.query("SELECT * FROM ?", {Table: table}, (err, res) => {
    if (res) {
      return false;
    } else {
      return res;
    }
  });
}

const checkTableEmpty = (table) => {
  connection.query('SELECT * FROM ?', {Table: table}, (err, res) => {
    if (res) {
      return false;
    } else {
      return true;
    }
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
    connection.query("INSERT INTO departments (name) VALUE (?)", {Name:name}, ((err,res) => {
      if (err) throw err;
      console.log(`A new Department with the name ${name} has been created?`)
    }))
}

const addRole = async () => {
  const { title, salary } = inquirer.prompt([
    {
      type: "input",
      message: "What role would you like to add",
      name: title
    },
    {
      type: "input",
      message: "What is the salary of this role?"
    }
  ])
  salary = parseFloat(salary).toFixed(2);
  const depoTable = getTable("departments");
  console.table(depoTable);
}

const addEmployee = () => {

}

const displayTable = (table) => {
  console.table(getTable(table));
  init();
}

const viewRole = () => {

}

const viewDepartment = () => {

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
      if(checkTableEmpty("roles")) {
        addEmployee();
      } else {
        console.log("\nYou cannot added a Employee since there is no roles.\nTry adding a role first.\n")
        init();
      }
      break;
    case "Add Role":
      if(checkTableEmpty("departments")) {
        addRole();
      } else {
        console.log("\nYou cannot added a Role since there is no Departments.\nTry adding a Department first.\n")
        init();
      }
      break;
    case "Add Department":
      addDepartment();
      break;
    case "View Employee":
      if(checkTableEmpty("employees")) {
        displayTable("employees")
      } else {
        console.log("\nIt Seems like the currently are no employees saved.\nTry adding one!.\n")
        init();
      }
      break;
    case "View Role":
      if(checkTableEmpty("roles")) {
        displayTable("roles");
      } else {
        console.log("\nIt Seems like the currently are no roles saved.\nTry adding one!.\n")
        init();
      }
      break;
    case "View Department":
      if(checkTableEmpty("departments")) {
        displayTable("departments");
      } else {
        console.log("\nIt Seems like the currently are no departments saved.\nTry adding one!\n")
        init();
      }
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

