const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');

class WindowsWebDriverConfig {
  constructor() {
    this.driver = null;
    this.baseUrl = 'http://localhost:3000';
  }

  findChromeBinary() {
    // Common Chrome installation paths on Windows
    const chromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google\\Chrome\\Application\\chrome.exe')
    ];
    
    for (const chromePath of chromePaths) {
      if (fs.existsSync(chromePath)) {
        console.log(`✅ Found Chrome at: ${chromePath}`);
        return chromePath;
      }
    }
    
    console.log('⚠️  Chrome binary not found in common locations');
    return null;
  }

  findChromeDriver() {
    // Look for chromedriver in node_modules
    const possiblePaths = [
      path.join(process.cwd(), 'node_modules', 'chromedriver', 'lib', 'chromedriver', 'chromedriver.exe'),
      path.join(process.cwd(), 'node_modules', '.bin', 'chromedriver.exe'),
      path.join(process.cwd(), 'node_modules', 'chromedriver', 'bin', 'chromedriver.exe')
    ];

    for (const driverPath of possiblePaths) {
      if (fs.existsSync(driverPath)) {
        console.log(`✅ Found ChromeDriver at: ${driverPath}`);
        return driverPath;
      }
    }

    console.log('⚠️  ChromeDriver not found in node_modules');
    return null;
  }

  async createDriver(headless = false) {
    try {
      console.log('🔧 Setting up Windows-specific Chrome configuration...');
      
      const options = new chrome.Options();
      
      // Find Chrome binary
      const chromeBinary = this.findChromeBinary();
      if (chromeBinary) {
        options.setChromeBinaryPath(chromeBinary);
      }

      // Essential Chrome arguments for Windows
      const args = [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ];

      if (headless) {
        args.push('--headless');
      }

      // Add arguments
      args.forEach(arg => {
        console.log(`➕ Adding Chrome argument: ${arg}`);
        options.addArguments(arg);
      });

      console.log('🚀 Creating WebDriver...');

      // Try to find and use local chromedriver
      const chromeDriverPath = this.findChromeDriver();
      let service = null;

      if (chromeDriverPath) {
        console.log(`🎯 Using local ChromeDriver: ${chromeDriverPath}`);
        service = new chrome.ServiceBuilder(chromeDriverPath);
      } else {
        console.log('🌐 Using system ChromeDriver');
        service = new chrome.ServiceBuilder();
      }

      // Create driver
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(service)
        .build();

      console.log('✅ WebDriver created successfully!');
      return this.driver;
      
    } catch (error) {
      console.error('❌ Failed to create WebDriver:', error.message);
      
      // Fallback: Try without service builder
      console.log('🔄 Trying fallback configuration...');
      try {
        const fallbackOptions = new chrome.Options();
        
        const chromeBinary = this.findChromeBinary();
        if (chromeBinary) {
          fallbackOptions.setChromeBinaryPath(chromeBinary);
        }
        
        fallbackOptions.addArguments('--no-sandbox');
        fallbackOptions.addArguments('--disable-dev-shm-usage');
        
        if (headless) {
          fallbackOptions.addArguments('--headless');
        }

        this.driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(fallbackOptions)
          .build();

        console.log('✅ Fallback WebDriver created successfully!');
        return this.driver;
        
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError.message);
        throw new Error(`Both primary and fallback WebDriver creation failed.\nPrimary: ${error.message}\nFallback: ${fallbackError.message}`);
      }
    }
  }

  async quitDriver() {
    if (this.driver) {
      try {
        console.log('🧹 Closing WebDriver...');
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
      console.log(`🌐 Navigating to ${this.baseUrl}...`);
      await this.driver.get(this.baseUrl);
      
      // Wait for page to be ready
      await this.driver.executeScript('return document.readyState').then(state => {
        console.log(`📄 Page ready state: ${state}`);
      });
      
      console.log('✅ Navigation completed');
    } catch (error) {
      console.error('❌ Navigation failed:', error.message);
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
      console.log(`📸 Screenshot saved: ${filepath}`);
    } catch (error) {
      console.error('❌ Screenshot failed:', error.message);
    }
  }
}

module.exports = WindowsWebDriverConfig;
