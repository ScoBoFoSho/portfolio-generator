const fs = require("fs");

const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "File Created",
      });
    });
  });
};

const copyFile = () => {
  return new Promise((resolve, rejecct) => {
    fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "File Copied",
      });
    });
  });
};

// export the above functions for use in deployment (send to "dist" sub-directory)

module.exports = { writeFile, copyFile };
