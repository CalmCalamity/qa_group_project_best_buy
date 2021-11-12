import { BestBuyPage } from "../BestBuyPage";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new BestBuyPage(driver);

// variables for tests
const searchQuery: string = "fish";

describe("BestBuy Search Tests", () => {
  // Before tests open the page and close the popup
  beforeAll(async () => {
    await page.navigate();
  }, 30000);
  // After tests kill the connections
  afterAll(async () => {
    await driver.quit();
  });

<<<<<<< HEAD
  // Test that runs a basic search
  test("Simple Search Test", async () => {
    await page.doSearch(searchQuery);
    expect(await page.getResults()).toContain(searchQuery);
  }, 60000);
});
=======
    // Test that runs a basic search
    it("Simple Search Test", async () => {
      await page.doSearch(searchQuery);
      expect(await page.getResults()).toContain(searchQuery);
    }, 60000);
  });
>>>>>>> 50d8d3f88f2783b3e4436d3a2d0f2ef3350f5706
