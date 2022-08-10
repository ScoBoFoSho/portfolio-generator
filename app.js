const inquirer = require("inquirer");
const generatePage = require("./src/page-template");
// const fs = require("fs");
const { writeFile, copyFile } = require("./utils/generate-site.js");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "What is your GitHub Username:",
      validate: (GithubInput) => {
        if (GithubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub Username!");
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  console.log(`
=================
Add a New Project
=================
    `);
  // if no projects exist, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (projectInput) => {
          if (projectInput) {
            return true;
          } else {
            console.log("Please enter your project name!");
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "What is your project about?",
        validate: (infoInput) => {
          if (infoInput) {
            return true;
          } else {
            console.log("Please describe your project!");
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "What is the GitHub link to your project? (required):",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter your GitHub link!");
          }
        },
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
    .then((projectData) => {
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
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });

// promptUser()
//   .then(promptProject)
//   .then((portfolioData) => {
//     const pageHTML = generatePage(portfolioData);
//     fs.writeFile("./dist/index.html", pageHTML, (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log(
//         "Page created! Check out index.html in this directory to see it!"
//       );

//       fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log("Style sheet copied successfully!");
//       });
//     });
//   });
