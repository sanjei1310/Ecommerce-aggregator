const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const MinimalWebDriverConfig = require('../config/minimal.config');

describe('HomePage Minimal Tests (Maximum Compatibility)', function() {
  let webDriverConfig;
  let driver;

  // Set timeout
  this.timeout(30000);

  before(async function() {
    console.log('\n🚀 === SELENIUM WEBDRIVER SETUP ===');
    console.log('🖥️  OS: Windows');
    console.log('🌐 Browser: Chrome');
    console.log('⚙️  Configuration: Minimal (Maximum Compatibility)');
    console.log('📍 Target URL: http://localhost:3000');
    
    try {
      webDriverConfig = new MinimalWebDriverConfig();
      driver = await webDriverConfig.createDriver(false); // Change to true for headless
      console.log('✅ WebDriver setup completed successfully\n');
    } catch (error) {
      console.error('❌ WebDriver setup failed:', error.message);
      throw error;
    }
  });

  after(async function() {
    console.log('\n🧹 === CLEANUP ===');
    if (webDriverConfig) {
      await webDriverConfig.quitDriver();
      console.log('✅ Cleanup completed\n');
    }
  });

  it('Test 1: Should load homepage successfully', async function() {
    console.log('\n📋 --- TEST 1: Homepage Load ---');
    
    try {
      // Navigate to homepage
      await webDriverConfig.navigateToHomePage();
      
      // Wait for page to load
      console.log('⏳ Waiting for page to load...');
      await driver.sleep(5000);
      
      // Check page title
      const title = await driver.getTitle();
      console.log(`📄 Page title: "${title}"`);
      
      // Verify title contains expected text
      expect(title).to.include('ShopAggregator');
      console.log('✅ Title verification passed');
      
      // Take screenshot
      await webDriverConfig.takeScreenshot('test1-homepage-loaded');
      
      console.log('✅ TEST 1 PASSED: Homepage loaded successfully');
      
    } catch (error) {
      console.error('❌ TEST 1 FAILED:', error.message);
      await webDriverConfig.takeScreenshot('test1-failed');
      throw error;
    }
  });

  it('Test 2: Should find React root element', async function() {
    console.log('\n📋 --- TEST 2: React Root Element ---');
    
    try {
      // Navigate to homepage
      await webDriverConfig.navigateToHomePage();
      await driver.sleep(3000);
      
      // Find root element
      console.log('🔍 Looking for React root element...');
      const rootElement = await driver.findElement(By.id('root'));
      expect(rootElement).to.not.be.null;
      console.log('✅ React root element found');
      
      // Check if root has content
      const rootText = await rootElement.getText();
      console.log(`📝 Root element content length: ${rootText.length} characters`);
      
      // Take screenshot
      await webDriverConfig.takeScreenshot('test2-root-element');
      
      console.log('✅ TEST 2 PASSED: React root element verified');
      
    } catch (error) {
      console.error('❌ TEST 2 FAILED:', error.message);
      await webDriverConfig.takeScreenshot('test2-failed');
      throw error;
    }
  });

  it('Test 3: Should handle basic page operations', async function() {
    console.log('\n📋 --- TEST 3: Basic Page Operations ---');
    
    try {
      // Navigate to homepage
      await webDriverConfig.navigateToHomePage();
      await driver.sleep(3000);
      
      // Test 1: Get current URL
      console.log('🔗 Checking current URL...');
      const currentUrl = await driver.getCurrentUrl();
      console.log(`📍 Current URL: ${currentUrl}`);
      expect(currentUrl).to.include('localhost:3000');
      console.log('✅ URL verification passed');
      
      // Test 2: Page source check
      console.log('📄 Checking page source...');
      const pageSource = await driver.getPageSource();
      expect(pageSource).to.include('root');
      expect(pageSource.length).to.be.greaterThan(100);
      console.log(`📊 Page source length: ${pageSource.length} characters`);
      console.log('✅ Page source verification passed');
      
      // Test 3: Simple scrolling
      console.log('📜 Testing page scrolling...');
      await driver.executeScript('window.scrollTo(0, 300);');
      await driver.sleep(1000);
      await driver.executeScript('window.scrollTo(0, 0);');
      await driver.sleep(1000);
      console.log('✅ Scrolling test passed');
      
      // Take screenshot
      await webDriverConfig.takeScreenshot('test3-page-operations');
      
      console.log('✅ TEST 3 PASSED: Basic page operations completed');
      
    } catch (error) {
      console.error('❌ TEST 3 FAILED:', error.message);
      await webDriverConfig.takeScreenshot('test3-failed');
      throw error;
    }
  });

  it('Test 4: Should test window resizing', async function() {
    console.log('\n📋 --- TEST 4: Window Resizing ---');
    
    try {
      // Navigate to homepage
      await webDriverConfig.navigateToHomePage();
      await driver.sleep(3000);
      
      // Test different window sizes
      const sizes = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Desktop', width: 1920, height: 1080 }
      ];
      
      for (const size of sizes) {
        console.log(`📱 Testing ${size.name} size: ${size.width}x${size.height}`);
        
        await driver.manage().window().setRect({ 
          width: size.width, 
          height: size.height 
        });
        await driver.sleep(2000);
        
        // Verify page is still accessible
        const title = await driver.getTitle();
        expect(title).to.include('ShopAggregator');
        
        await webDriverConfig.takeScreenshot(`test4-${size.name.toLowerCase()}`);
        console.log(`✅ ${size.name} size test passed`);
      }
      
      console.log('✅ TEST 4 PASSED: Window resizing completed');
      
    } catch (error) {
      console.error('❌ TEST 4 FAILED:', error.message);
      await webDriverConfig.takeScreenshot('test4-failed');
      throw error;
    }
  });

  it('Test 5: Should handle page refresh', async function() {
    console.log('\n📋 --- TEST 5: Page Refresh ---');
    
    try {
      // Navigate to homepage
      await webDriverConfig.navigateToHomePage();
      await driver.sleep(3000);
      
      console.log('🔄 Refreshing page...');
      await driver.navigate().refresh();
      await driver.sleep(5000);
      
      // Verify page still works after refresh
      const title = await driver.getTitle();
      expect(title).to.include('ShopAggregator');
      console.log('✅ Page refresh handled successfully');
      
      // Take screenshot
      await webDriverConfig.takeScreenshot('test5-after-refresh');
      
      console.log('✅ TEST 5 PASSED: Page refresh completed');
      
    } catch (error) {
      console.error('❌ TEST 5 FAILED:', error.message);
      await webDriverConfig.takeScreenshot('test5-failed');
      throw error;
    }
  });
});
