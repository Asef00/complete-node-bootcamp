const fs = require("fs");
const http = require("http");

//blocking code
const readFileSync = () => {
  const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
  console.log(textIn);

  const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
  fs.writeFileSync("./txt/output.txt", textOut);
  console.log("File written!");
};

//non-blocking code
const readFile = () => fs.readFile("./txt/start.txt", "utf-8", (err, fileName) => {
  if (err) return console.log("Error reading file");
  console.log("File name:", fileName);

  fs.readFile(`./txt/${fileName}.txt`, "utf-8", (err, mainContext) => {
    console.log("Main context:", mainContext);
    fs.readFile("./txt/append.txt", "utf-8", (err, appendData) => {
      console.log("Append data:", appendData);
      fs.writeFile(
        `./generated/${Date.now()}.txt`,
        `${mainContext}\n${appendData}`,
        (err) => {
          console.log("File written!");
        }
      );
    });
  });
});

// readFileSync();
// readFile();
