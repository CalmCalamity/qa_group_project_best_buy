import { BestBuyPage } from "../BestBuyPage";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new BestBuyPage(driver);

// variables for tests
const searchQuery: string = "cat";

describe("BestBuy Recently Viewed Tests", () => {
  // Before tests open the page and close the popup
  beforeAll(async () => {
    await page.navigate();
  }, 30000);
  // After tests kill the connections
  afterAll(async () => {
    await driver.quit();
  });

  // Test that verifies the recently viewed functionality
  test("Recently Viewed Test", async () => {
    await page.doSearchFeelingLucky(searchQuery);
    const sku: string = await page.getText(page.skuTitle);
    await driver.sleep(2000);
    await page.goHome();
    await page.click(page.recentlyViewed);
    await driver.sleep(1000);
    expect(await page.getText(page.recentlyViewedList)).toContain(sku);
  }, 60000);
});