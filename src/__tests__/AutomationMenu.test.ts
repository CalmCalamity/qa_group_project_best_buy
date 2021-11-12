import { BestBuyPage } from "../BestBuyPage";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new BestBuyPage(driver);

// variables for tests
const pageTitle: string = "Computer & Tablet Services";

describe("BestBuy Menu Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

    // Test that opens one of items from the menu then verifies that is the pageTitle in the variable
    test("Menu Test", async () => {
      await page.openSupportMenu();
      expect(await page.checkTitle(pageTitle)).toBe(true);
    }, 60000);
  });