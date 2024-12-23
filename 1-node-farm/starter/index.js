const fs = require("fs");

//blocking code
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");

//non-blocking code
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);

  const textOut = `This is what we know about the avocado: ${data}.\nCreated on ${Date.now()}`;

  fs.writeFile("./txt/end.txt", textOut, (err) => {
    console.log("File written!");
  });
});
