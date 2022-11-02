const browserObject = require("./browser");
const scraperController = require("./pageController");
var express = require("express");
var path = require("path");

var app = express();
var cors = require("cors");

app.use(cors());

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

app.get("/getData", async function (req, res) {
  if (!browserInstance) browserInstance = await browserObject.startBrowser();
  let website = `https://votes${req.query.website}.bechirot.gov.il/`;
  let data;
  try {
    data = await scraperController(browserInstance, website);
  } catch (err) {
    console.error("return empty");
    data = [];
  }

  res.send(data);
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static("dist"));

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
// Pass the browser instance to the scraper controller
// scraperController(browserInstance);
