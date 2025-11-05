const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const DirectWebDriverConfig = require('../config/direct.config');

describe('HomePage Direct Tests (Windows Compatible)', function() {
  let webDriverConfig;
  let driver;

  // Set longer timeout for Windows
  this.timeout(45000);

  before(async function() {
    console.log('\n=== SETTING UP SELENIUM WEBDRIVER ===');
    console.log('OS: Windows');
    console.log('Browser: Chrome');
    console.log('Configuration: Direct (Windows Compatible)');
    
    try {
      webDriverConfig = new DirectWebDriverConfig();
      driver = await webDriverConfig.createDriver(false); // Set to true for headless
      console.log('✅ WebDriver setup completed successfully');
    } catch (error) {
      console.error('❌ WebDriver setup failed:', error.message);
      throw error;
    }
  });

  after(async function() {
    console.log('\n=== CLEANING UP WEBDRIVER ===');
    if (webDriverConfig) {
      await webDriverConfig.quitDriver();
      console.log('✅ WebDriver cleanup completed');
    }
  });

  describe('Basic Page Tests', function() {
    it('should successfully load the homepage', async function() {
      console.log('\n--- Test 1: Homepage Load ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        console.log('✅ Navigation completed');
        
        // Wait for page to load
        console.log('Waiting for page to load...');
        await driver.sleep(5000);
        
        // Check page title
        const title = await driver.getTitle();
        console.log(`📄 Page title: "${title}"`);
        expect(title).to.include('ShopAggregator');
        console.log('✅ Title verification passed');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('homepage-loaded');
        
        console.log('✅ Test 1 completed successfully');
        
      } catch (error) {
        console.error('❌ Test 1 failed:', error.message);
        await webDriverConfig.takeScreenshot('test1-failed');
        throw error;
      }
    });

    it('should find and verify main DOM elements', async function() {
      console.log('\n--- Test 2: DOM Elements ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        // Check root element
        console.log('Looking for root element...');
        const rootElement = await driver.findElement(By.id('root'));
        expect(rootElement).to.not.be.null;
        console.log('✅ Root element found');
        
        // Check if any div elements exist
        console.log('Looking for div elements...');
        const divElements = await driver.findElements(By.css('div'));
        console.log(`📊 Found ${divElements.length} div elements`);
        expect(divElements.length).to.be.greaterThan(0);
        console.log('✅ Div elements found');
        
        // Check page source contains React content
        console.log('Checking page source...');
        const pageSource = await driver.getPageSource();
        expect(pageSource).to.include('root');
        console.log('✅ Page source verification passed');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('dom-elements-verified');
        
        console.log('✅ Test 2 completed successfully');
        
      } catch (error) {
        console.error('❌ Test 2 failed:', error.message);
        await webDriverConfig.takeScreenshot('test2-failed');
        throw error;
      }
    });

    it('should handle basic page interactions', async function() {
      console.log('\n--- Test 3: Page Interactions ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        // Test scrolling
        console.log('Testing page scrolling...');
        await driver.executeScript('window.scrollTo(0, 500);');
        await driver.sleep(1000);
        console.log('✅ Scroll down completed');
        
        await driver.executeScript('window.scrollTo(0, 0);');
        await driver.sleep(1000);
        console.log('✅ Scroll to top completed');
        
        // Test window resize
        console.log('Testing window resize...');
        await driver.manage().window().setRect({ width: 1200, height: 800 });
        await driver.sleep(1000);
        console.log('✅ Window resize completed');
        
        // Get current URL
        const currentUrl = await driver.getCurrentUrl();
        console.log(`🔗 Current URL: ${currentUrl}`);
        expect(currentUrl).to.include('localhost:3000');
        console.log('✅ URL verification passed');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('interactions-completed');
        
        console.log('✅ Test 3 completed successfully');
        
      } catch (error) {
        console.error('❌ Test 3 failed:', error.message);
        await webDriverConfig.takeScreenshot('test3-failed');
        throw error;
      }
    });

    it('should test responsive viewport changes', async function() {
      console.log('\n--- Test 4: Responsive Design ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        const viewports = [
          { name: 'Mobile', width: 375, height: 667 },
          { name: 'Tablet', width: 768, height: 1024 },
          { name: 'Desktop', width: 1920, height: 1080 }
        ];
        
        for (const viewport of viewports) {
          console.log(`Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})...`);
          
          await driver.manage().window().setRect({ 
            width: viewport.width, 
            height: viewport.height 
          });
          await driver.sleep(2000);
          
          // Verify page is still accessible
          const title = await driver.getTitle();
          expect(title).to.include('ShopAggregator');
          
          // Take screenshot for each viewport
          await webDriverConfig.takeScreenshot(`responsive-${viewport.name.toLowerCase()}`);
          
          console.log(`✅ ${viewport.name} viewport test passed`);
        }
        
        console.log('✅ Test 4 completed successfully');
        
      } catch (error) {
        console.error('❌ Test 4 failed:', error.message);
        await webDriverConfig.takeScreenshot('test4-failed');
        throw error;
      }
    });
  });

  describe('Error Recovery Tests', function() {
    it('should handle page refresh gracefully', async function() {
      console.log('\n--- Test 5: Page Refresh ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        console.log('Refreshing page...');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        
        // Verify page still works after refresh
        const title = await driver.getTitle();
        expect(title).to.include('ShopAggregator');
        console.log('✅ Page refresh handled successfully');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('after-refresh');
        
        console.log('✅ Test 5 completed successfully');
        
      } catch (error) {
        console.error('❌ Test 5 failed:', error.message);
        await webDriverConfig.takeScreenshot('test5-failed');
        throw error;
      }
    });
  });
});
