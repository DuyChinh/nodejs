const fs = require("fs");
const {dirname} = require("path");
module.exports = (data) => {
    const dataPath = process.cwd() + "/data.txt";
    data.forEach((email) => {
        fs.writeFileSync(dataPath, email + "/n", {
          encoding: "utf8",
          flag: "a+",
          mode: 0o666,
        });
        
    })
}