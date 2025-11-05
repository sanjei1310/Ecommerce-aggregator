const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const WindowsWebDriverConfig = require('../config/windows.config');

describe('HomePage Windows Tests (Path-Independent)', function() {
  let webDriverConfig;
  let driver;

  // Set timeout
  this.timeout(45000);

  before(async function() {
    console.log('\n🚀 === WINDOWS SELENIUM WEBDRIVER SETUP ===');
    console.log('🖥️  OS: Windows');
    console.log('🌐 Browser: Chrome (Auto-detected)');
    console.log('⚙️  Configuration: Windows-specific with path detection');
    console.log('📍 Target URL: http://localhost:3000');
    console.log('🔍 Auto-detecting Chrome and ChromeDriver paths...\n');
    
    try {
      webDriverConfig = new WindowsWebDriverConfig();
      driver = await webDriverConfig.createDriver(false); // Change to true for headless
      console.log('\n✅ WebDriver setup completed successfully!\n');
    } catch (error) {
      console.error('\n❌ WebDriver setup failed:', error.message);
      console.error('\n💡 Troubleshooting tips:');
      console.error('   1. Make sure Google Chrome is installed');
      console.error('   2. Try running: npm install chromedriver --save-dev');
      console.error('   3. Check if Chrome is running and close all instances');
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

  describe('Core Functionality Tests', function() {
    it('Should successfully load the homepage', async function() {
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
        await webDriverConfig.takeScreenshot('windows-test1-homepage-loaded');
        
        console.log('✅ TEST 1 PASSED: Homepage loaded successfully');
        
      } catch (error) {
        console.error('❌ TEST 1 FAILED:', error.message);
        await webDriverConfig.takeScreenshot('windows-test1-failed');
        throw error;
      }
    });

    it('Should verify React application is running', async function() {
      console.log('\n📋 --- TEST 2: React Application Verification ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        // Find React root element
        console.log('🔍 Looking for React root element...');
        const rootElement = await driver.findElement(By.id('root'));
        expect(rootElement).to.not.be.null;
        console.log('✅ React root element found');
        
        // Check if root has content (React has rendered)
        const rootText = await rootElement.getText();
        console.log(`📝 Root element content length: ${rootText.length} characters`);
        expect(rootText.length).to.be.greaterThan(0);
        console.log('✅ React content verification passed');
        
        // Check for any div elements (React components)
        const divElements = await driver.findElements(By.css('div'));
        console.log(`🧩 Found ${divElements.length} div elements (React components)`);
        expect(divElements.length).to.be.greaterThan(1);
        console.log('✅ React components verification passed');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('windows-test2-react-verified');
        
        console.log('✅ TEST 2 PASSED: React application verified');
        
      } catch (error) {
        console.error('❌ TEST 2 FAILED:', error.message);
        await webDriverConfig.takeScreenshot('windows-test2-failed');
        throw error;
      }
    });

    it('Should handle page interactions and navigation', async function() {
      console.log('\n📋 --- TEST 3: Page Interactions ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        // Test 1: URL verification
        console.log('🔗 Verifying current URL...');
        const currentUrl = await driver.getCurrentUrl();
        console.log(`📍 Current URL: ${currentUrl}`);
        expect(currentUrl).to.include('localhost:3000');
        console.log('✅ URL verification passed');
        
        // Test 2: Page source check
        console.log('📄 Checking page source...');
        const pageSource = await driver.getPageSource();
        expect(pageSource).to.include('root');
        expect(pageSource).to.include('ShopAggregator');
        console.log(`📊 Page source length: ${pageSource.length} characters`);
        console.log('✅ Page source verification passed');
        
        // Test 3: JavaScript execution
        console.log('⚡ Testing JavaScript execution...');
        const jsResult = await driver.executeScript('return document.title;');
        expect(jsResult).to.include('ShopAggregator');
        console.log('✅ JavaScript execution test passed');
        
        // Test 4: Scrolling
        console.log('📜 Testing page scrolling...');
        await driver.executeScript('window.scrollTo(0, 500);');
        await driver.sleep(1000);
        const scrollY = await driver.executeScript('return window.pageYOffset;');
        expect(scrollY).to.be.greaterThan(0);
        console.log(`📏 Scroll position: ${scrollY}px`);
        
        // Scroll back to top
        await driver.executeScript('window.scrollTo(0, 0);');
        await driver.sleep(1000);
        console.log('✅ Scrolling test passed');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('windows-test3-interactions');
        
        console.log('✅ TEST 3 PASSED: Page interactions completed');
        
      } catch (error) {
        console.error('❌ TEST 3 FAILED:', error.message);
        await webDriverConfig.takeScreenshot('windows-test3-failed');
        throw error;
      }
    });

    it('Should test responsive design across viewports', async function() {
      console.log('\n📋 --- TEST 4: Responsive Design ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        // Test different viewport sizes
        const viewports = [
          { name: 'Mobile', width: 375, height: 667 },
          { name: 'Tablet', width: 768, height: 1024 },
          { name: 'Desktop', width: 1920, height: 1080 }
        ];
        
        for (const viewport of viewports) {
          console.log(`📱 Testing ${viewport.name} viewport: ${viewport.width}x${viewport.height}`);
          
          // Set viewport size
          await driver.manage().window().setRect({ 
            width: viewport.width, 
            height: viewport.height 
          });
          await driver.sleep(2000);
          
          // Verify page is still accessible
          const title = await driver.getTitle();
          expect(title).to.include('ShopAggregator');
          
          // Check if page content is still there
          const rootElement = await driver.findElement(By.id('root'));
          const rootText = await rootElement.getText();
          expect(rootText.length).to.be.greaterThan(0);
          
          // Take screenshot for each viewport
          await webDriverConfig.takeScreenshot(`windows-test4-${viewport.name.toLowerCase()}`);
          console.log(`✅ ${viewport.name} viewport test passed`);
        }
        
        console.log('✅ TEST 4 PASSED: Responsive design verified');
        
      } catch (error) {
        console.error('❌ TEST 4 FAILED:', error.message);
        await webDriverConfig.takeScreenshot('windows-test4-failed');
        throw error;
      }
    });

    it('Should handle page refresh and recovery', async function() {
      console.log('\n📋 --- TEST 5: Page Refresh & Recovery ---');
      
      try {
        // Navigate to homepage
        await webDriverConfig.navigateToHomePage();
        await driver.sleep(3000);
        
        // Get initial state
        const initialTitle = await driver.getTitle();
        console.log(`📄 Initial title: "${initialTitle}"`);
        
        // Refresh the page
        console.log('🔄 Refreshing page...');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        
        // Verify page recovered properly
        const refreshedTitle = await driver.getTitle();
        console.log(`📄 Title after refresh: "${refreshedTitle}"`);
        expect(refreshedTitle).to.equal(initialTitle);
        console.log('✅ Page refresh handled successfully');
        
        // Verify React app is still working
        const rootElement = await driver.findElement(By.id('root'));
        const rootText = await rootElement.getText();
        expect(rootText.length).to.be.greaterThan(0);
        console.log('✅ React app recovery verified');
        
        // Test navigation back and forward
        console.log('🔄 Testing browser navigation...');
        await driver.navigate().refresh();
        await driver.sleep(2000);
        
        const finalTitle = await driver.getTitle();
        expect(finalTitle).to.include('ShopAggregator');
        console.log('✅ Browser navigation test passed');
        
        // Take screenshot
        await webDriverConfig.takeScreenshot('windows-test5-refresh-recovery');
        
        console.log('✅ TEST 5 PASSED: Page refresh and recovery completed');
        
      } catch (error) {
        console.error('❌ TEST 5 FAILED:', error.message);
        await webDriverConfig.takeScreenshot('windows-test5-failed');
        throw error;
      }
    });
  });
});
