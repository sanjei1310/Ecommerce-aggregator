const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class SimpleWebDriverConfig {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
  }

  async createDriver(headless = false) {
    try {
      const options = new chrome.Options();
      
      if (headless) {
        options.addArguments('--headless=new');
      }
      
      // Minimal Chrome options for Windows compatibility
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments('--window-size=1920,1080');
      
      console.log('Creating Chrome WebDriver...');
      
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      
      console.log('WebDriver created successfully!');
      return this.driver;
      
    } catch (error) {
      console.error('Failed to create WebDriver:', error.message);
      throw error;
    }
  }

  async quitDriver() {
    if (this.driver) {
      try {
        await this.driver.quit();
        console.log('WebDriver closed successfully');
      } catch (error) {
        console.error('Error closing WebDriver:', error.message);
      }
      this.driver = null;
    }
  }

  async navigateToHomePage() {
    try {
      console.log(`Navigating to ${this.baseUrl}...`);
      await this.driver.get(this.baseUrl);
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation failed:', error.message);
      throw error;
    }
  }
}

module.exports = SimpleWebDriverConfig;
