const scraperObject = {
  async scraper(browser, website) {
    let page = await browser.newPage();
    console.log(`Navigating to ${website}...`);
    // Navigate to the selected page
    await page.goto(website, { timeout: 5000 });
    // Wait for the required DOM to be rendered
    await page.waitForSelector(".FloatDir");
    let headtable = await page.$$eval("thead.TableCategory > tr", (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll("th");
        return Array.from(columns, (column) => column.innerText);
      });
    });
    console.log(headtable);

    let amountIndex = headtable[0].findIndex(
      (ht) => ht === "מספר הקולות הכשרים לרשימה"
    );
    console.log(amountIndex);
    let table = await page.$$eval("table.TableData > tbody > tr", (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll("td");
        return Array.from(columns, (column) => column.innerText);
      });
    });

    let jsonT = table.map((row) => {
      return { letters: row[0], amount: row[amountIndex - 1] };
    });

    console.log(jsonT);

    return jsonT;
  },
};

module.exports = scraperObject;
