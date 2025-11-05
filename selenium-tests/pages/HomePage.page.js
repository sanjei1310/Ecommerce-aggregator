const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    
    // Page elements
    this.selectors = {
      // Header elements
      header: By.css('header'),
      logo: By.css('[data-testid="logo"]'),
      searchInput: By.css('input[type="search"]'),
      cartButton: By.css('[data-testid="cart-button"]'),
      
      // Filter elements
      filterSidebar: By.css('aside'),
      mobileFilterButton: By.css('button:has(svg)'), // Filter button with funnel icon
      mobileFilterDrawer: By.css('.fixed.left-0'),
      closeFilterButton: By.css('button:has(svg[data-slot="icon"])'), // Close button with X icon
      
      // Sort elements
      sortDropdown: By.css('[data-testid="sort-dropdown"]'),
      
      // Product grid
      productGrid: By.css('[data-testid="product-grid"]'),
      productCards: By.css('[data-testid="product-card"]'),
      productImage: By.css('[data-testid="product-image"]'),
      productTitle: By.css('[data-testid="product-title"]'),
      productPrice: By.css('[data-testid="product-price"]'),
      addToCartButton: By.css('[data-testid="add-to-cart"]'),
      
      // Loading states
      loadingSpinner: By.css('[data-testid="loading"]'),
      
      // Error states
      errorMessage: By.css('[data-testid="error"]'),
      
      // Responsive elements
      mobileElements: By.css('.lg\\:hidden'),
      desktopElements: By.css('.hidden.lg\\:block, .hidden.lg\\:flex')
    };
  }

  async waitForPageLoad() {
    await this.driver.wait(until.titleContains('ShopAggregator'), 10000);
    // Wait for main content to be visible
    await this.driver.wait(until.elementLocated(By.css('div')), 5000);
  }

  async isElementVisible(selector) {
    try {
      const element = await this.driver.findElement(selector);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async clickElement(selector) {
    const element = await this.driver.wait(until.elementLocated(selector), 10000);
    await this.driver.wait(until.elementIsEnabled(element), 5000);
    await element.click();
  }

  async getText(selector) {
    const element = await this.driver.wait(until.elementLocated(selector), 10000);
    return await element.getText();
  }

  async getElementCount(selector) {
    try {
      const elements = await this.driver.findElements(selector);
      return elements.length;
    } catch (error) {
      return 0;
    }
  }

  // Header interactions
  async searchForProduct(searchTerm) {
    const searchInput = await this.driver.wait(until.elementLocated(this.selectors.searchInput), 10000);
    await searchInput.clear();
    await searchInput.sendKeys(searchTerm);
    await searchInput.sendKeys('\n'); // Press Enter
  }

  async clickCartButton() {
    await this.clickElement(this.selectors.cartButton);
  }

  // Filter interactions
  async openMobileFilter() {
    await this.clickElement(this.selectors.mobileFilterButton);
    // Wait for drawer to appear
    await this.driver.wait(until.elementLocated(this.selectors.mobileFilterDrawer), 5000);
  }

  async closeMobileFilter() {
    await this.clickElement(this.selectors.closeFilterButton);
    // Wait for drawer to disappear
    await this.driver.sleep(1000); // Animation time
  }

  async isMobileFilterOpen() {
    return await this.isElementVisible(this.selectors.mobileFilterDrawer);
  }

  // Product interactions
  async getProductCount() {
    return await this.getElementCount(this.selectors.productCards);
  }

  async clickFirstProduct() {
    const products = await this.driver.findElements(this.selectors.productCards);
    if (products.length > 0) {
      await products[0].click();
    }
  }

  async addFirstProductToCart() {
    const addToCartButtons = await this.driver.findElements(this.selectors.addToCartButton);
    if (addToCartButtons.length > 0) {
      await addToCartButtons[0].click();
    }
  }

  async getFirstProductTitle() {
    const titles = await this.driver.findElements(this.selectors.productTitle);
    if (titles.length > 0) {
      return await titles[0].getText();
    }
    return null;
  }

  async getFirstProductPrice() {
    const prices = await this.driver.findElements(this.selectors.productPrice);
    if (prices.length > 0) {
      return await prices[0].getText();
    }
    return null;
  }

  // Responsive design checks
  async isMobileView() {
    const viewport = await this.driver.executeScript('return {width: window.innerWidth, height: window.innerHeight};');
    return viewport.width < 1024; // lg breakpoint in Tailwind
  }

  async isDesktopView() {
    return !(await this.isMobileView());
  }

  async checkResponsiveElements() {
    const isMobile = await this.isMobileView();
    
    if (isMobile) {
      // Mobile filter button should be visible
      return await this.isElementVisible(this.selectors.mobileFilterButton);
    } else {
      // Desktop filter sidebar should be visible
      return await this.isElementVisible(this.selectors.filterSidebar);
    }
  }

  // Utility methods
  async scrollToBottom() {
    await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
    await this.driver.sleep(1000);
  }

  async scrollToTop() {
    await this.driver.executeScript('window.scrollTo(0, 0);');
    await this.driver.sleep(1000);
  }

  async waitForProductsToLoad() {
    // Wait for at least one product to be visible
    await this.driver.wait(until.elementLocated(this.selectors.productCards), 10000);
  }
}

module.exports = HomePage;
