#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Selenium Test Setup...\n');

// Check if required directories exist
const requiredDirs = [
  'selenium-tests',
  'selenium-tests/config',
  'selenium-tests/tests',
  'selenium-tests/pages',
  'selenium-tests/scripts'
];

console.log('📁 Checking directory structure...');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - MISSING`);
  }
});

// Check if required files exist
const requiredFiles = [
  'selenium-tests/config/webdriver.config.js',
  'selenium-tests/config/silent.config.js',
  'selenium-tests/config/simple.config.js',
  'selenium-tests/tests/HomePage.silent.test.js',
  'selenium-tests/tests/HomePage.simple.test.js',
  'selenium-tests/pages/HomePage.page.js',
  'selenium-tests/README.md',
  'selenium-tests/TEST-CASES-DOCUMENTATION.md'
];

console.log('\n📄 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

// Check package.json for required dependencies
console.log('\n📦 Checking package.json dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = [
    'selenium-webdriver',
    'chromedriver', 
    'mocha',
    'chai',
    'start-server-and-test'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]}`);
    } else if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
    }
  });
  
  // Check scripts
  console.log('\n🚀 Checking npm scripts...');
  const requiredScripts = [
    'test:e2e:simple',
    'test:e2e:silent', 
    'test:e2e:presentation'
  ];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ ${script}`);
    } else {
      console.log(`❌ ${script} - MISSING`);
    }
  });
  
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Check if Chrome is installed
console.log('\n🌐 Checking Chrome installation...');
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe')
];

let chromeFound = false;
chromePaths.forEach(chromePath => {
  if (fs.existsSync(chromePath)) {
    console.log(`✅ Chrome found at: ${chromePath}`);
    chromeFound = true;
  }
});

if (!chromeFound) {
  console.log('⚠️  Chrome not found in standard locations');
  console.log('   Please install Chrome from https://www.google.com/chrome/');
}

console.log('\n🎯 Setup Verification Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Make sure npm install has completed');
console.log('2. Start your React app: npm start');
console.log('3. Run tests: npm run test:e2e:simple');
console.log('\n🚀 Happy Testing!');
