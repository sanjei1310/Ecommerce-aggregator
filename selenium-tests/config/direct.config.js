const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

class DirectWebDriverConfig {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
  }

  async createDriver(headless = false) {
    try {
      console.log('Setting up Chrome options...');
      
      const options = new chrome.Options();
      
      // Essential Chrome arguments to prevent wmic.exe issues
      const chromeArgs = [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-field-trial-config',
        '--disable-background-networking',
        '--disable-sync',
        '--disable-translate',
        '--disable-ipc-flooding-protection',
        '--window-size=1920,1080'
      ];

      if (headless) {
        chromeArgs.push('--headless=new');
      }

      // Add all arguments
      chromeArgs.forEach(arg => options.addArguments(arg));

      console.log('Creating WebDriver with direct service...');
      
      // Try to create driver without service management
      const service = new chrome.ServiceBuilder();
      
      // Only use methods that exist in the current selenium-webdriver version
      try {
        service.enableVerboseLogging(false);
      } catch (e) {
        console.log('Verbose logging method not available, continuing...');
      }

      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(service)
        .build();

      console.log('WebDriver created successfully!');
      return this.driver;
      
    } catch (error) {
      console.error('Failed to create WebDriver:', error.message);
      
      // Fallback: Try with minimal configuration
      console.log('Trying fallback configuration...');
      try {
        const fallbackOptions = new chrome.Options();
        fallbackOptions.addArguments('--no-sandbox');
        fallbackOptions.addArguments('--disable-dev-shm-usage');
        
        if (headless) {
          fallbackOptions.addArguments('--headless=new');
        }

        this.driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(fallbackOptions)
          .build();

        console.log('Fallback WebDriver created successfully!');
        return this.driver;
        
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError.message);
        throw new Error(`Both primary and fallback WebDriver creation failed. Primary: ${error.message}, Fallback: ${fallbackError.message}`);
      }
    }
  }

  async quitDriver() {
    if (this.driver) {
      try {
        console.log('Closing WebDriver...');
        await this.driver.quit();
        console.log('WebDriver closed successfully');
      } catch (error) {
        console.error('Error closing WebDriver:', error.message);
        // Force kill if needed
        try {
          await this.driver.close();
        } catch (closeError) {
          console.error('Force close also failed:', closeError.message);
        }
      }
      this.driver = null;
    }
  }

  async navigateToHomePage() {
    try {
      console.log(`Navigating to ${this.baseUrl}...`);
      await this.driver.get(this.baseUrl);
      
      // Wait for page to be ready
      await this.driver.executeScript('return document.readyState').then(state => {
        console.log('Page ready state:', state);
      });
      
      console.log('Navigation completed');
    } catch (error) {
      console.error('Navigation failed:', error.message);
      throw error;
    }
  }

  async takeScreenshot(filename) {
    try {
      const screenshot = await this.driver.takeScreenshot();
      const fs = require('fs');
      const screenshotDir = path.join(__dirname, '../screenshots');
      
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      const filepath = path.join(screenshotDir, `${filename}.png`);
      fs.writeFileSync(filepath, screenshot, 'base64');
      console.log(`Screenshot saved: ${filepath}`);
    } catch (error) {
      console.error('Screenshot failed:', error.message);
    }
  }
}

module.exports = DirectWebDriverConfig;
