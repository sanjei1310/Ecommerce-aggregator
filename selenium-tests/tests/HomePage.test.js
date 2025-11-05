const { describe, it, before, after, beforeEach } = require('mocha');
const { expect } = require('chai');
const WebDriverConfig = require('../config/webdriver.config');
const HomePage = require('../pages/HomePage.page');

describe('HomePage End-to-End Tests', function() {
  let webDriverConfig;
  let driver;
  let homePage;

  // Increase timeout for Selenium tests
  this.timeout(60000);

  before(async function() {
    console.log('Setting up WebDriver...');
    webDriverConfig = new WebDriverConfig();
    driver = await webDriverConfig.createDriver('chrome', false); // Set to true for headless
    homePage = new HomePage(driver);
  });

  after(async function() {
    console.log('Cleaning up WebDriver...');
    if (webDriverConfig) {
      await webDriverConfig.quitDriver();
    }
  });

  beforeEach(async function() {
    console.log(`Running test: ${this.currentTest.title}`);
    await webDriverConfig.navigateToHomePage();
    await homePage.waitForPageLoad();
  });

  describe('Page Load and Basic Elements', function() {
    it('should load the homepage successfully', async function() {
      const title = await driver.getTitle();
      expect(title).to.include('ShopAggregator');
      
      // Take screenshot for verification
      await webDriverConfig.takeScreenshot('homepage-loaded');
    });

    it('should display the main layout elements', async function() {
      // Check if main content area is present
      const mainContent = await homePage.isElementVisible(homePage.selectors.productGrid);
      expect(mainContent).to.be.true;
      
      // Check responsive design
      const hasResponsiveElements = await homePage.checkResponsiveElements();
      expect(hasResponsiveElements).to.be.true;
    });

    it('should display products on the page', async function() {
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).to.be.greaterThan(0);
      
      console.log(`Found ${productCount} products on the page`);
    });
  });

  describe('Mobile Filter Functionality', function() {
    beforeEach(async function() {
      // Set mobile viewport for these tests
      await webDriverConfig.setViewportSize(375, 667); // iPhone dimensions
      await driver.navigate().refresh();
      await homePage.waitForPageLoad();
    });

    it('should show mobile filter button in mobile view', async function() {
      const isMobileView = await homePage.isMobileView();
      expect(isMobileView).to.be.true;
      
      const filterButtonVisible = await homePage.isElementVisible(homePage.selectors.mobileFilterButton);
      expect(filterButtonVisible).to.be.true;
      
      await webDriverConfig.takeScreenshot('mobile-view-filter-button');
    });

    it('should open and close mobile filter drawer', async function() {
      // Open filter drawer
      await homePage.openMobileFilter();
      
      // Verify drawer is open
      const isDrawerOpen = await homePage.isMobileFilterOpen();
      expect(isDrawerOpen).to.be.true;
      
      await webDriverConfig.takeScreenshot('mobile-filter-drawer-open');
      
      // Close filter drawer
      await homePage.closeMobileFilter();
      
      // Verify drawer is closed
      const isDrawerClosed = !(await homePage.isMobileFilterOpen());
      expect(isDrawerClosed).to.be.true;
      
      await webDriverConfig.takeScreenshot('mobile-filter-drawer-closed');
    });
  });

  describe('Desktop Layout', function() {
    beforeEach(async function() {
      // Set desktop viewport for these tests
      await webDriverConfig.setViewportSize(1920, 1080);
      await driver.navigate().refresh();
      await homePage.waitForPageLoad();
    });

    it('should show desktop filter sidebar in desktop view', async function() {
      const isDesktopView = await homePage.isDesktopView();
      expect(isDesktopView).to.be.true;
      
      const sidebarVisible = await homePage.isElementVisible(homePage.selectors.filterSidebar);
      expect(sidebarVisible).to.be.true;
      
      await webDriverConfig.takeScreenshot('desktop-view-sidebar');
    });

    it('should not show mobile filter button in desktop view', async function() {
      const filterButtonVisible = await homePage.isElementVisible(homePage.selectors.mobileFilterButton);
      expect(filterButtonVisible).to.be.false;
    });
  });

  describe('Product Interactions', function() {
    it('should display product information correctly', async function() {
      await homePage.waitForProductsToLoad();
      
      const firstProductTitle = await homePage.getFirstProductTitle();
      const firstProductPrice = await homePage.getFirstProductPrice();
      
      expect(firstProductTitle).to.not.be.null;
      expect(firstProductPrice).to.not.be.null;
      
      console.log(`First product: ${firstProductTitle} - ${firstProductPrice}`);
      
      await webDriverConfig.takeScreenshot('product-information');
    });

    it('should be able to interact with product cards', async function() {
      await homePage.waitForProductsToLoad();
      
      const initialProductCount = await homePage.getProductCount();
      expect(initialProductCount).to.be.greaterThan(0);
      
      // Try to click on the first product (this might navigate or show details)
      await homePage.clickFirstProduct();
      
      // Wait a moment for any potential navigation or modal
      await driver.sleep(2000);
      
      await webDriverConfig.takeScreenshot('product-clicked');
    });
  });

  describe('Scrolling and Page Behavior', function() {
    it('should handle page scrolling correctly', async function() {
      await homePage.waitForProductsToLoad();
      
      // Scroll to bottom
      await homePage.scrollToBottom();
      await webDriverConfig.takeScreenshot('scrolled-to-bottom');
      
      // Scroll back to top
      await homePage.scrollToTop();
      await webDriverConfig.takeScreenshot('scrolled-to-top');
      
      // Verify we can still see the main elements
      const hasResponsiveElements = await homePage.checkResponsiveElements();
      expect(hasResponsiveElements).to.be.true;
    });
  });

  describe('Responsive Design Tests', function() {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(viewport => {
      it(`should display correctly on ${viewport.name} (${viewport.width}x${viewport.height})`, async function() {
        await webDriverConfig.setViewportSize(viewport.width, viewport.height);
        await driver.navigate().refresh();
        await homePage.waitForPageLoad();
        
        // Check if responsive elements are working
        const hasResponsiveElements = await homePage.checkResponsiveElements();
        expect(hasResponsiveElements).to.be.true;
        
        // Check if products are still visible
        await homePage.waitForProductsToLoad();
        const productCount = await homePage.getProductCount();
        expect(productCount).to.be.greaterThan(0);
        
        await webDriverConfig.takeScreenshot(`${viewport.name.toLowerCase()}-view`);
      });
    });
  });

  describe('Error Handling and Edge Cases', function() {
    it('should handle page refresh gracefully', async function() {
      await homePage.waitForProductsToLoad();
      
      // Refresh the page
      await driver.navigate().refresh();
      await homePage.waitForPageLoad();
      
      // Verify page still works
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).to.be.greaterThan(0);
      
      await webDriverConfig.takeScreenshot('after-refresh');
    });

    it('should handle browser navigation', async function() {
      await homePage.waitForProductsToLoad();
      
      // Navigate away and back
      await driver.get('about:blank');
      await driver.sleep(1000);
      
      await webDriverConfig.navigateToHomePage();
      await homePage.waitForPageLoad();
      
      // Verify page still works
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).to.be.greaterThan(0);
      
      await webDriverConfig.takeScreenshot('after-navigation');
    });
  });
});
