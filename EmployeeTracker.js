const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const addData = () => {
  
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
    case "View DATA":
      viewData();
      break
    case "Update Data":
      updateData();
      break
  }
}

init();
