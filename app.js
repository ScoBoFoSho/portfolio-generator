// the array that collects our data
const profileDataArgs = process.argv.slice(2, process.argv.length);
// takes in user input from command line
const [name, github] = profileDataArgs;
// the necessary object that allows us to access file system module
const fs = require("fs");

const generatePage = require("./src/page-template.js");

const pageHtml = generatePage(name, github);
fs.writeFile("./index.html", generatePage(name, github), (err) => {
  if (err) throw err;

  console.log("Portfolio complete! Check out index.html to see the output!");
});
