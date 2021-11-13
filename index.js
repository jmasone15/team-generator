const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const Manager = require("./employees/Manager");
let placeholder = {
    type: "",
    name: "",
    message: "",
    validate: answer => {
        if (answer !== "") {
            return true
        } else {
            return "Please enter a value."
        }
    }
}

const teamMembers = [];

function init() {
    console.log("Welcome to the Team Generator!");

    function createManager() {
      console.log("Build your team's manager!");
      inquirer
      .prompt([
          {
              type: "input",
              name: "managerName",
              message: "What is the manager's name?",
              validate: answer => {
                  if (answer !== "") {
                      return true
                  } else {
                      return "Please enter a value."
                  }
              }
          },
          {
              type: "input",
              name: "managerId",
              message: "What is the manager's Id?",
              validate: answer => {
                  const validNum = answer.match(
                      /^\d+$/
                  );
                  if (validNum) {
                      return true
                  } else {
                      return "Please enter a numeric value."
                  }
              }
          },
          {
              type: "input",
              name: "managerEmail",
              message: "What is the manager's email?",
              validate: answer => {
                  const validEmail = answer.match(
                      /\S+@\S+\.\S+/
                  );
                  if (validEmail) {
                      return true
                  } else {
                      return "Please enter a valid email address."
                  }
              }
          },
          {
            type: "input",
            name: "managerOfficeNum",
            message: "What is the manager's office number?",
            validate: answer => {
                const validPhone = answer.match(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                );
                if (validPhone) {
                    return true
                } else {
                    return "Please enter a valid phone number."
                }
            }
        }
      ])
      .then(answers => {
          const newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail);
          teamMembers.push(newManager);
          createTeam();
      })
      .catch(err => {
          if (err) {
            console.error(err);
          } else {
            console.log("Something went wrong.")
          }
      })
    };

    function createTeam() {
        console.log("Build your team!");
        inquirer.prompt([
            {
                type: "list",
                name: "teamChoice",
                message: "Which team member would you like to build next?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I am ready to build my team!"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.teamChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        }).catch(err => {
            if (err) {
              console.error(err);
            } else {
              console.log("Something went wrong.")
            }
        })
    };

    function addEngineer() {
        console.log("Build your Engineer!");
        createTeam();
    };

    function addIntern() {
        console.log("Build your Intern!");
        createTeam();
    };

    function buildTeam() {
        console.log("Building team...")
    };

    createManager();
};

init();