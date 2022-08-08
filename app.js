const inquirer = require("inquirer");
const generatePage = require("./src/page-template.js");
const fs = require("fs");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub Username:",
      validate: GithubInput => {
        if (GithubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub Username!');
        }
      }
    },
    {
  type: 'confirm',
  name: 'confirmAbout',
  message: 'Would you like to enter some information about yourself for an "About" section?',
  default: true
    },
    {
      type: "input",
      name: "bio",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    },
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
    `);
    // if no projects exist, create one
    if (!portfolioData.projects) {
      portfolioData.projects = []
    }
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project?",
      validate: projectInput => {
        if (projectInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
        }
      }
    },
    {
      type: "input",
      name: "about",
      message: "What is your project about?",
      validate: infoInput => {
        if (infoInput) {
          return true;
        } else {
          console.log('Please describe your project!');
        }
      }
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you build this project with? (Check all that apply)",
      choices: ["JavaScript","HTML","CSS","ES6","jQuery","Bootstrap","Node",
      ],
    },
    {
      type: "input",
      name: "link",
      message: "What is the GitHub link to your project? (required):",
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please enter your GitHub link!');
        }
      }
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "Would you like to enter another project?",
      default: false,
    },
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

// const [name, github] = profileDataArgs;


// const pageHtml = generatePage(name, github);
// fs.writeFile("./index.html", generatePage(name, github), (err) => {
//   if (err) throw err;

//   console.log("Portfolio complete! Check out index.html to see the output!");
// });
