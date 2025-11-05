const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const SimpleWebDriverConfig = require('../config/simple.config');

describe('HomePage Simple Tests', function() {
  let webDriverConfig;
  let driver;

  // Increase timeout for Selenium tests
  this.timeout(30000);

  before(async function() {
    console.log('Setting up WebDriver...');
    webDriverConfig = new SimpleWebDriverConfig();
    driver = await webDriverConfig.createDriver(false); // Set to true for headless
  });

  after(async function() {
    console.log('Cleaning up WebDriver...');
    if (webDriverConfig) {
      await webDriverConfig.quitDriver();
    }
  });

  it('should load the homepage successfully', async function() {
    console.log('Starting homepage test...');
    
    // Navigate to homepage
    await webDriverConfig.navigateToHomePage();
    
    // Wait for page to load
    await driver.sleep(3000);
    
    // Check page title
    const title = await driver.getTitle();
    console.log('Page title:', title);
    expect(title).to.include('ShopAggregator');
    
    console.log('Homepage test completed successfully!');
  });

  it('should display main content elements', async function() {
    console.log('Testing main content elements...');
    
    // Navigate to homepage
    await webDriverConfig.navigateToHomePage();
    
    // Wait for page to load
    await driver.sleep(3000);
    
    // Check if main div exists
    const mainDiv = await driver.findElement(By.css('div'));
    expect(mainDiv).to.not.be.null;
    
    // Check if root element exists
    const rootElement = await driver.findElement(By.id('root'));
    expect(rootElement).to.not.be.null;
    
    console.log('Main content elements test completed!');
  });

  it('should handle page interactions', async function() {
    console.log('Testing page interactions...');
    
    // Navigate to homepage
    await webDriverConfig.navigateToHomePage();
    
    // Wait for page to load
    await driver.sleep(5000);
    
    // Try to scroll the page
    await driver.executeScript('window.scrollTo(0, 500);');
    await driver.sleep(1000);
    
    // Scroll back to top
    await driver.executeScript('window.scrollTo(0, 0);');
    await driver.sleep(1000);
    
    // Check if we can get page source
    const pageSource = await driver.getPageSource();
    expect(pageSource).to.include('root');
    
    console.log('Page interactions test completed!');
  });

  it('should test responsive behavior', async function() {
    console.log('Testing responsive behavior...');
    
    // Navigate to homepage
    await webDriverConfig.navigateToHomePage();
    
    // Wait for page to load
    await driver.sleep(3000);
    
    // Test mobile viewport
    await driver.manage().window().setRect({ width: 375, height: 667 });
    await driver.sleep(2000);
    
    // Test tablet viewport
    await driver.manage().window().setRect({ width: 768, height: 1024 });
    await driver.sleep(2000);
    
    // Test desktop viewport
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    await driver.sleep(2000);
    
    console.log('Responsive behavior test completed!');
  });
});
