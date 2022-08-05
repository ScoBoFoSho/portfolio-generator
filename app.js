// the array that collects our data
const profileDataArgs = process.argv.slice(2, process.argv.length);
// takes in user input from command line
const [name, github] = profileDataArgs;
// the necessary object that allows us to access file system module
const fs = require("fs");

const generatePage = (userName, githubName) => {
  return `
    <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};

fs.writeFile("index.html", generatePage(name, github), (err) => {
  if (err) throw err;

  console.log("Portfolio complete! Check out index.html to see the output!");
});
