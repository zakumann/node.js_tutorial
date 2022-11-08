const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer(
    (req, res) => {
        const baseURL = `http://${req.headers.host}`;
        console.log(baseURL);
        const requestURL = new URL(req.url, baseURL);
        console.log(requestURL);
        const pathname = requestURL.pathname;
        console.log(pathname);
        const query = requestURL.searchParams.get('id');
        console.log(query);
 
        // Overview page
        if (pathname === "/" || pathname === "/overview" || pathname === "/overview/") {
            const cardsHtml = dataObj.map(product => replaceTemplate(tempCard, product)).join("");
            const overviewOutput = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(overviewOutput);
 
            // Product page
        } else if (pathname === "/product" || pathname === "/product/") {
            const product = dataObj[query];
            const output = replaceTemplate(tempProduct, product);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(output);
 
            // api page
        } else if (pathname === "/api") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
 
            // 404 page
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h3>404 - Page not found!</h3>");
        }
    },
);
 
server.listen(
    8000, "127.0.0.1",
    () => {
        console.log("Listening to port 8000 on 127.0.0.1 ...");
    },
);