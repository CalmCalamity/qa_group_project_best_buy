
   
import { BestBuyPage } from "../BestBuyPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new BestBuyPage(driver);

// variable for tests
const ContactUs = By.css('a[data-lid="ft_support_contact_us"]');
const OtherButton= By.xpath('//*[@class="c-button c-button-outline c-button-md plButton plButton__l"]');
describe("BestBuy Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
      await page.navigate();
    }, 40000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

     // Test that clicks on Contact Us
     test("Contact Us", async () => {
       
       
        await page.click(ContactUs);
        await page.click(OtherButton);
        expect(await page.getResults);
      }, 60000);
    });