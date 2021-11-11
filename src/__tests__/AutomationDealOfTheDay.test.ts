import { BestBuyPage } from "../BestBuyPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new BestBuyPage(driver);

// variables for tests
const DD = By.css('a[data-lid="hdr_dotd"]');
const timeLeft = By.css('p[class="countdown-title"') 

describe("BestBuy Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
      await page.navigate();
    }, 10000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

     // Test that runs a basic search
     test("Deal of the Day", async () => {
       
       
        await page.click(DD);
        expect(await page.getText(timeLeft));
      }, 30000);
    });