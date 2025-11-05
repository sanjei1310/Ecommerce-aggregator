const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

class WebDriverConfig {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
    this.timeout = 10000;
  }

  async createDriver(browser = 'chrome', headless = false) {
    let options;
    
    try {
      switch (browser.toLowerCase()) {
        case 'chrome':
          options = new chrome.Options();
          if (headless) {
            options.addArguments('--headless=new'); // Use new headless mode
          }
          // Add Chrome-specific options for Windows compatibility
          options.addArguments('--no-sandbox');
          options.addArguments('--disable-dev-shm-usage');
          options.addArguments('--disable-gpu');
          options.addArguments('--disable-web-security');
          options.addArguments('--disable-features=VizDisplayCompositor');
          options.addArguments('--disable-extensions');
          options.addArguments('--disable-plugins');
          options.addArguments('--window-size=1920,1080');
          options.addArguments('--start-maximized');
          options.addArguments('--remote-debugging-port=9222');
          
          // Set Chrome binary path if needed (Windows specific)
          const chromePath = this.findChromeBinary();
          if (chromePath) {
            options.setChromeBinaryPath(chromePath);
          }
          
          this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
          break;
          
        case 'firefox':
          options = new firefox.Options();
          if (headless) {
            options.addArguments('--headless');
          }
          options.setPreference('dom.webnotifications.enabled', false);
          options.setPreference('media.navigator.permission.disabled', true);
          
          this.driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
          break;
          
        default:
          throw new Error(`Unsupported browser: ${browser}`);
      }

      // Set timeouts
      await this.driver.manage().setTimeouts({ 
        implicit: this.timeout,
        pageLoad: this.timeout * 2,
        script: this.timeout
      });
      
      console.log(`WebDriver created successfully for ${browser}`);
      return this.driver;
      
    } catch (error) {
      console.error('Error creating WebDriver:', error.message);
      throw new Error(`Failed to create WebDriver for ${browser}: ${error.message}`);
    }
  }

  findChromeBinary() {
    const { execSync } = require('child_process');
    const path = require('path');
    
    // Common Chrome installation paths on Windows
    const chromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google\\Chrome\\Application\\chrome.exe')
    ];
    
    const fs = require('fs');
    
    for (const chromePath of chromePaths) {
      if (fs.existsSync(chromePath)) {
        console.log(`Found Chrome at: ${chromePath}`);
        return chromePath;
      }
    }
    
    console.log('Chrome binary not found in common locations, using system default');
    return null;
  }

  async quitDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  async navigateToHomePage() {
    await this.driver.get(this.baseUrl);
    await this.driver.wait(until.titleContains('ShopAggregator'), this.timeout);
  }

  async waitForElement(locator, timeout = this.timeout) {
    return await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async waitForElementVisible(locator, timeout = this.timeout) {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async waitForElementClickable(locator, timeout = this.timeout) {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(until.elementIsEnabled(element), timeout);
    return element;
  }

  async takeScreenshot(filename) {
    const screenshot = await this.driver.takeScreenshot();
    const fs = require('fs');
    const path = require('path');
    
    const screenshotDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const filepath = path.join(screenshotDir, `${filename}.png`);
    fs.writeFileSync(filepath, screenshot, 'base64');
    console.log(`Screenshot saved: ${filepath}`);
  }

  async scrollToElement(element) {
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
    await this.driver.sleep(500); // Small delay for smooth scrolling
  }

  async getViewportSize() {
    return await this.driver.executeScript('return {width: window.innerWidth, height: window.innerHeight};');
  }

  async setViewportSize(width, height) {
    await this.driver.manage().window().setRect({ width, height });
  }
}

module.exports = WebDriverConfig;
