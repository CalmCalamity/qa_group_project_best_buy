import { By, until, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

// url for Best Buy
const url: string = "https://www.bestbuy.com";

export class BestBuyPage extends BasePage{
    home: By = By.className("logo");
    searchBar: By = By.className("search-input");
    results: By = By.className("col-xs-9");
    firstResult: By = By.xpath("(//img [@class='product-image'])[1]");
    sku: By = By.className("sku product-data");
    cancelPopup: By = By.className("c-close-icon c-modal-close-icon");
    menu: By = By.className("c-button-unstyled hamburger-menu-button");
    menuIcon:  By = By.className("liDropdownList");
    menuSupport:  By = By.xpath("//button [contains(text(), 'Support & Services')]");
    menuSupportComputer:  By = By.xpath("//a [contains(text(), 'Computer & Tablet Services')]");
    recentlyViewed: By = By.className("c-button-unstyled plButton recentlyViewed-button");
    recentlyViewedList: By = By.className("pl-flex-carousel-container v-no-overlay ");
    pageTitle: By = By.className("page-title");
    promoTitle: By = By.className("promo-title title");
    searchTitle: By = By.className("search-title");
    skuTitle: By =  By.className("sku-title");
  
    constructor(driver: WebDriver) {
        super(driver, url);
    }

    // method to open url and check for existing elements
    async navigate() {
        await super.navigate();
        // need to close popup if it exists
        if(await this.driver.findElement(this.cancelPopup).isDisplayed()){
            await this.click(this.cancelPopup);
            // while the popup is an issue we need to sleep so the site is reachable
            await this.driver.sleep(2000);
        }
        await this.driver.wait(until.elementLocated(this.searchBar));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.searchBar)));
    }

    async doSearch(text: string) {
        await this.setInput(this.searchBar, `${text}`);
        await this.setInput(this.searchBar, `\n`);
    }

    async doSearchFeelingLucky(text: string) {
        await this.doSearch(text);
        await this.click(this.firstResult);
    }

    async getResults() {
        return await this.getText(this.results);
    }

    async getSKU() {
        return await this.getText(this.sku);
    }

    async openMenu() {
        await this.click(this.menu);
    }

    async openSupportMenu() {
        await this.openMenu();
        await this.click(this.menuSupport);
        await this.click(this.menuSupportComputer);
    }

    async checkTitle(title: string) {
        if (await this.driver.findElement(this.pageTitle).isDisplayed()){
            return (await this.getText(this.pageTitle)).includes(title);
        } else if (await this.driver.findElement(this.promoTitle).isDisplayed()){
            return (await this.getText(this.promoTitle)).includes(title);
        } else if (await this.driver.findElement(this.searchTitle).isDisplayed()){
            return (await this.getText(this.searchTitle)).includes(title);
        } else if (await this.driver.findElement(this.skuTitle).isDisplayed()){
            return (await this.getText(this.skuTitle)).includes(title);
        } else return false;
    }

    async goHome() {
        await this.click(this.home);
    }
}