const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class MinimalWebDriverConfig {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
  }

  async createDriver(headless = false) {
    try {
      console.log('Setting up minimal Chrome configuration...');
      
      const options = new chrome.Options();
      
      // Minimal Chrome arguments that should work on any Windows system
      const args = [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080'
      ];

      if (headless) {
        args.push('--headless');
      }

      // Add arguments one by one
      args.forEach(arg => {
        console.log(`Adding Chrome argument: ${arg}`);
        options.addArguments(arg);
      });

      console.log('Creating WebDriver with minimal configuration...');
      
      // Create driver with minimal setup - no service builder
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      console.log('✅ WebDriver created successfully!');
      return this.driver;
      
    } catch (error) {
      console.error('❌ Failed to create WebDriver:', error.message);
      console.error('Full error:', error);
      throw error;
    }
  }

  async quitDriver() {
    if (this.driver) {
      try {
        console.log('Closing WebDriver...');
        await this.driver.quit();
        console.log('✅ WebDriver closed successfully');
      } catch (error) {
        console.error('❌ Error closing WebDriver:', error.message);
      }
      this.driver = null;
    }
  }

  async navigateToHomePage() {
    try {
      console.log(`Navigating to ${this.baseUrl}...`);
      await this.driver.get(this.baseUrl);
      console.log('✅ Navigation completed');
    } catch (error) {
      console.error('❌ Navigation failed:', error.message);
      throw error;
    }
  }

  async takeScreenshot(filename) {
    try {
      const screenshot = await this.driver.takeScreenshot();
      const fs = require('fs');
      const path = require('path');
      
      const screenshotDir = path.join(__dirname, '../screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      const filepath = path.join(screenshotDir, `${filename}.png`);
      fs.writeFileSync(filepath, screenshot, 'base64');
      console.log(`📸 Screenshot saved: ${filepath}`);
    } catch (error) {
      console.error('❌ Screenshot failed:', error.message);
    }
  }
}

module.exports = MinimalWebDriverConfig;
