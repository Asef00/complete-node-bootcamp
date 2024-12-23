const fs = require("fs");
const http = require("http");
const url = require("url");

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

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const createServer = () => {
  http.createServer((req, res) => {
    // res.end("Hello from the server!");
    const pathName = req.url;
    if (pathName === "/overview" || pathName === "/") {
      res.end("This is the overview");
    } else if (pathName === "/product") {
      res.end("This is the product");
    } else if (pathName === "/api") {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(productData);
    } else {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>Page not found</h1>");
    }
  }).listen(8000, "127.0.0.2", () => {
    console.log("Listening to requests on port 8000");
  });
};

createServer();
