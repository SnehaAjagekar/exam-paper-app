import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';
import assert from 'assert';

describe('Secure Exam App Login Test', function () {

    this.timeout(20000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:5173/login?role=Distributor');
    });

    it('should login successfully', async function () {

        await driver.wait(until.elementLocated(By.name('username')), 10000);
        //Wrong Password and username
        await driver.findElement(By.name('username')).sendKeys('dis2');
        await driver.findElement(By.name('password')).sendKeys('dis2');
        await driver.findElement(By.tagName('button')).click();

        await driver.wait(until.urlContains('distributor'), 10000);

        let currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('distributor'));
    });

    after(async function () {
        await driver.quit();
    });

});
