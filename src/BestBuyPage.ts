import { By, until, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

// url for Best Buy
const url: string = "https://www.bestbuy.com";

export class BestBuyPage extends BasePage{
    searchBar: By = By.className("search-input");
    results: By = By.className("col-xs-9");
    cancelPopup: By = By.className("c-close-icon c-modal-close-icon")
  
    constructor(driver: WebDriver) {
        super(driver, url);
    }

    // method to open url and check for existing elements
    async navigate() {
        await super.navigate();
        await this.driver.sleep(4000);
        // need to close popup
        // if there is time it is better to see if the popup counts as an alert and change this into an if statement
        //await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.cancelPopup)));
        if(await this.driver.findElement(this.cancelPopup).isDisplayed){
            await this.click(this.cancelPopup);
        }
        //await this.click(this.cancelPopup);
        // while the popup is an issue we need to sleep so the site is reachable
        await this.driver.sleep(2000);
        await this.driver.wait(until.elementLocated(this.searchBar));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.searchBar)));
    }

    // 
    async doSearch(text: string) {
        await this.setInput(this.searchBar, `${text}`);
        await this.setInput(this.searchBar, `\n`);
    }

    async getResults() {
        return await this.getText(this.results);
    }
}