const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const SimpleWebDriverConfig = require('../config/simple.config');

describe('Login Page Tests', function() {
  let webDriverConfig;
  let driver;

  // Increase timeout for Selenium tests
  this.timeout(45000);

  before(async function() {
    webDriverConfig = new SimpleWebDriverConfig();
    driver = await webDriverConfig.createDriver(false); // set true for headless
  });

  after(async function() {
    if (webDriverConfig) {
      await webDriverConfig.quitDriver();
    }
  });

  it('should show the Login page when unauthenticated', async function() {
    await webDriverConfig.navigateToHomePage();

    // Wait for the Login heading to appear
    const heading = await driver.wait(
      until.elementLocated(By.xpath("//h2[contains(., 'Sign In')]")),
      10000
    );
    const headingText = await heading.getText();
    expect(headingText).to.include('Sign In');

    // Ensure email and password fields are present
    const emailInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));

    expect(emailInput).to.not.be.null;
    expect(passwordInput).to.not.be.null;
  });

  it('should allow typing credentials and submitting', async function() {
    await webDriverConfig.navigateToHomePage();

    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
    const passwordInput = await driver.findElement(By.id('password'));

    await emailInput.clear();
    await emailInput.sendKeys('test@example.com');
    await passwordInput.clear();
    await passwordInput.sendKeys('incorrect-password');

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // After submit, either an error alert appears or loading state toggles then returns
    // Wait for either error box or button enabled again
    try {
      const errorBox = await driver.wait(
        until.elementLocated(By.css('div.bg-red-50')),
        8000
      );
      expect(await errorBox.getText()).to.be.a('string');
    } catch (e) {
      // If no error box, ensure the submit button is still present (submission didn't crash)
      const btn = await driver.findElement(By.css('button[type="submit"]'));
      expect(btn).to.not.be.null;
    }
  });
});
