import { BestBuyPage } from "../BestBuyPage";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new BestBuyPage(driver);

// variables for tests
const searchQuery1: string = "bird";
const searchQuery2: string = "dog";

let sku1: string = null;
let sku2: string = null;

describe("BestBuy Shopping Cart Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
        await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
        await driver.quit();
    });

    // Test that adds 2 items to a cart
    test("Add to Cart Test", async () => {
        await page.doSearchFeelingLucky(searchQuery1);
        sku1 = await page.getText(page.skuTitle);
        await page.addToCart();
        await page.doSearchFeelingLucky(searchQuery2);
        sku2 = await page.getText(page.skuTitle);
        await page.addToCart();
        await page.goShoppingCart();

        expect(await page.getText(page.shoppingCartList)).toContain(sku1);
        expect(await page.getText(page.shoppingCartList)).toContain(sku2);
    }, 60000);

    // Test that runs removes an item from the cart
    // Continues from the previous test
    test("Remove From Cart Test", async () => {
        expect(sku2).not.toBeNull();

        await page.cartRemove();

        expect(await page.getText(page.shoppingCartList)).not.toContain(sku2);
    }, 60000);

    // Test that saves an item in the cart for later
    // Continues from the previous test
    test("Save For Later Cart Test", async () => {
        expect(sku1).not.toBeNull();
        
        await page.cartSaveForLater();

        expect(await page.getText(page.cartSavedList)).toContain(sku1);
    }, 60000);
});