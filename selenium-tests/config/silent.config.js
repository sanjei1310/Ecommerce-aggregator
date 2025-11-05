const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');

class SilentWebDriverConfig {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
  }

  findChromeBinary() {
    const chromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google\\Chrome\\Application\\chrome.exe')
    ];
    
    for (const chromePath of chromePaths) {
      if (fs.existsSync(chromePath)) {
        console.log(`[INFO] Found Chrome at: ${chromePath}`);
        return chromePath;
      }
    }
    
    console.log('[WARN] Chrome binary not found in common locations');
    return null;
  }

  findChromeDriver() {
    const possiblePaths = [
      path.join(process.cwd(), 'node_modules', 'chromedriver', 'lib', 'chromedriver', 'chromedriver.exe'),
      path.join(process.cwd(), 'node_modules', '.bin', 'chromedriver.exe'),
      path.join(process.cwd(), 'node_modules', 'chromedriver', 'bin', 'chromedriver.exe')
    ];

    for (const driverPath of possiblePaths) {
      if (fs.existsSync(driverPath)) {
        console.log(`[INFO] Found ChromeDriver at: ${driverPath}`);
        return driverPath;
      }
    }

    console.log('[WARN] ChromeDriver not found in node_modules');
    return null;
  }

  async createDriver(headless = false) {
    try {
      console.log('[INFO] Setting up Chrome configuration...');
      
      const options = new chrome.Options();
      
      // Find Chrome binary
      const chromeBinary = this.findChromeBinary();
      if (chromeBinary) {
        options.setChromeBinaryPath(chromeBinary);
      }

      // Chrome arguments to prevent wmic.exe issues
      const args = [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-logging',
        '--disable-extensions',
        '--no-first-run',
        '--disable-default-apps',
        '--disable-popup-blocking',
        '--disable-translate',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-device-discovery-notifications'
      ];

      if (headless) {
        args.push('--headless');
      }

      args.forEach(arg => options.addArguments(arg));

      console.log('[INFO] Creating WebDriver...');

      // Create service with minimal logging
      const chromeDriverPath = this.findChromeDriver();
      let service = null;

      if (chromeDriverPath) {
        service = new chrome.ServiceBuilder(chromeDriverPath);
      } else {
        service = new chrome.ServiceBuilder();
      }

      // Suppress all service logging
      try {
        service.enableVerboseLogging(false);
        service.setStdioInheritance('ignore');
      } catch (e) {
        // Ignore if methods don't exist
      }

      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(service)
        .build();

      console.log('[PASS] WebDriver created successfully');
      return this.driver;
      
    } catch (error) {
      console.error('[FAIL] Failed to create WebDriver:', error.message);
      
      // Fallback with minimal options
      console.log('[INFO] Trying fallback configuration...');
      try {
        const fallbackOptions = new chrome.Options();
        
        const chromeBinary = this.findChromeBinary();
        if (chromeBinary) {
          fallbackOptions.setChromeBinaryPath(chromeBinary);
        }
        
        fallbackOptions.addArguments('--no-sandbox');
        fallbackOptions.addArguments('--disable-dev-shm-usage');
        fallbackOptions.addArguments('--disable-logging');
        
        if (headless) {
          fallbackOptions.addArguments('--headless');
        }

        this.driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(fallbackOptions)
          .build();

        console.log('[PASS] Fallback WebDriver created successfully');
        return this.driver;
        
      } catch (fallbackError) {
        console.error('[FAIL] Both primary and fallback WebDriver creation failed');
        throw new Error(`WebDriver creation failed: ${error.message}`);
      }
    }
  }

  async quitDriver() {
    if (this.driver) {
      try {
        console.log('[INFO] Closing WebDriver...');
        
        // Close all windows first
        const handles = await this.driver.getAllWindowHandles();
        for (const handle of handles) {
          await this.driver.switchTo().window(handle);
          await this.driver.close();
        }
        
        // Then quit the driver
        await this.driver.quit();
        console.log('[PASS] WebDriver closed successfully');
      } catch (error) {
        console.log('[WARN] Error during WebDriver cleanup (this is normal)');
        // Don't throw error during cleanup
      }
      this.driver = null;
    }
  }

  async navigateToHomePage() {
    try {
      console.log(`[NAV] Navigating to ${this.baseUrl}...`);
      await this.driver.get(this.baseUrl);
      
      await this.driver.executeScript('return document.readyState').then(state => {
        console.log(`[INFO] Page ready state: ${state}`);
      });
      
      console.log('[PASS] Navigation completed');
    } catch (error) {
      console.error('[FAIL] Navigation failed:', error.message);
      throw error;
    }
  }

  async takeScreenshot(filename) {
    try {
      const screenshot = await this.driver.takeScreenshot();
      const screenshotDir = path.join(__dirname, '../screenshots');
      
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      const filepath = path.join(screenshotDir, `${filename}.png`);
      fs.writeFileSync(filepath, screenshot, 'base64');
      console.log(`[SHOT] Screenshot saved: ${filepath}`);
    } catch (error) {
      console.log('[WARN] Screenshot failed:', error.message);
    }
  }
}

module.exports = SilentWebDriverConfig;
