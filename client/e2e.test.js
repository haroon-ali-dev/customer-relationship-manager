let enteredName;

describe("App.js", () => {
  it("creates and displays customer", async () => {
    // open application in browser
    await page.goto("http://localhost:3000");

    //type into form and submit
    await page.click("#name");
    await page.type("#name", "Haroon Ali");
    await page.click("#email");
    await page.type("#email", "haroon.ali.1104@gmail.com");

    enteredName = await page.$eval(
      "#name",
      (e) => e.value
    );

    await page.click("#btn-add");

    //check result
    await page.waitForSelector("li");
    const textName = await page.$eval("li", (e) => e.textContent);
    expect(textName).toContain(enteredName);
  });

  it("display customers on page load", async () => {
    // open application in browser
    await page.goto("http://localhost:3000");

    await page.waitForSelector("li");
    const textName = await page.$eval("li", (e) => e.textContent);
    expect(textName).toContain(enteredName);
  });

  it("display customer information when view button is clicked", async () => {
    await page.click(".btn-view");

    await page.waitForSelector(".cus-name");
    const textName = await page.$eval(".cus-name", (e) => e.textContent);

    expect(textName).toContain(enteredName);
  });

  it("update customer name and email", async () => {
    await page.click(".btn-edit");
    await page.waitForSelector("#name");

    await page.evaluate(() => document.querySelector("#name").value = "")
    await page.click("#name");
    await page.type("#name", "Samantha Smith");
    await page.evaluate(() => document.querySelector("#email").value = "")
    await page.click("#email");
    await page.type("#email", "gullible.jin@gmail.com");

    enteredName = await page.$eval(
      "#name",
      (e) => e.value
    );

    await page.click("#btn-update");

    await page.waitForSelector(".cus-name");
    const textName = await page.$eval(".cus-name", (e) => e.textContent);

    expect(textName).toContain(enteredName);
  });
});