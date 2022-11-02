const pageScraper = require("./pageScraper");
async function scrapeAll(browserInstance, website) {
  let browser;
  try {
    browser = await browserInstance;
    return await pageScraper.scraper(browser, website);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
    throw err;
  }
}

module.exports = (browserInstance, website) =>
  scrapeAll(browserInstance, website);
