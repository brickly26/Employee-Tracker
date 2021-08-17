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

const checkTable = (table) => {
  connection.query('SELECT * FROM ?', {Table: table}, (err, res) => {
    if (res) {
      return false;
    } else {
      return true;
    }
  });
}

const addData = async () => {
  
  const { userChoice } =  await inquirer.prompt([
    {
      type: "list",
      message: "What table would you like to add data to?",
      name: "userChoice",
      choices: ["Employee", "Role", "Department"]
    }
  ])
  switch (userChoice) {
    case "Employee":
      if(checkTable("roles")) {
        addEmployee();
      } else {
        console.log("\nYou cannot added a Employee since there is no roles.\nTry adding a role first.\n")
        addData();
      }
      break
    case "Role":
      if(checkTable("departments")) {
        addRole();
      } else {
        console.log("\nYou cannot added a Role since there is no Departments.\nTry adding a Department first.\n")
        addData();
      }
      break
    case "Department":
      addDepartment();
      break
  }
}

const viewData = () => {

}

const updateData = () => {

}

const init = async () => {
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userChoice",
      choices: ["Add Data", "View Data", "Update Data"]
    }
  ])
  switch (userChoice) {
    case "Add Data":
      addData();
      break
    case "View Data":
      viewData();
      break
    case "Update Data":
      updateData();
      break
  }
}

connection.connect((err) => {
  if (err) throw err;
  console.log('connect')
});

init();
