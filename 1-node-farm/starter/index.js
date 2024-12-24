const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate')
//blocking code
const readFileSync = () => {
  const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
  console.log(textIn)

  const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
  fs.writeFileSync('./txt/output.txt', textOut)
  console.log('File written!')
}

//non-blocking code
const readFile = () =>
  fs.readFile('./txt/start.txt', 'utf-8', (err, fileName) => {
    if (err) return console.log('Error reading file')
    console.log('File name:', fileName)

    fs.readFile(`./txt/${fileName}.txt`, 'utf-8', (err, mainContext) => {
      console.log('Main context:', mainContext)
      fs.readFile('./txt/append.txt', 'utf-8', (err, appendData) => {
        console.log('Append data:', appendData)
        fs.writeFile(
          `./generated/${Date.now()}.txt`,
          `${mainContext}\n${appendData}`,
          (err) => {
            console.log('File written!')
          },
        )
      })
    })
  })

// readFileSync();
// readFile();

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8',
)
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8',
)
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8',
)

const dataObj = JSON.parse(productData)
const slugs = dataObj.map((el) => slugify(el.name, { lower: true }))

const createServer = () => {
  http
    .createServer((req, res) => {
      // res.end("Hello from the server!");
      const { pathname } = url.parse(req.url, true)

      //overview page or home page
      if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const cardsHtml = dataObj
          .map((el) => replaceTemplate(cardTemplate, el))
          .join('')
        const output = overviewTemplate.replace('{{products}}', cardsHtml)
        res.end(output)
      }

      //product page
      else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const product = dataObj[query.id]
        const output = replaceTemplate(productTemplate, product)
        res.end(output)
      }

      //API
      else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(productData)
      }

      //not found
      else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end('<h1>Page not found</h1>')
      }
    })
    .listen(8000, '127.0.0.2', () => {
      console.log('Listening to requests on port 8000')
    })
}

createServer()
