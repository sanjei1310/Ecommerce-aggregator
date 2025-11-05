# PowerShell script to check Chrome and ChromeDriver setup
Write-Host "=== Chrome and ChromeDriver Diagnostic Script ===" -ForegroundColor Green

# Check if Chrome is installed
Write-Host "`nChecking Chrome installation..." -ForegroundColor Yellow
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$chromeFound = $false
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        Write-Host "✅ Chrome found at: $path" -ForegroundColor Green
        $chromeVersion = (Get-ItemProperty $path).VersionInfo.FileVersion
        Write-Host "   Version: $chromeVersion" -ForegroundColor Cyan
        $chromeFound = $true
        break
    }
}

if (-not $chromeFound) {
    Write-Host "❌ Chrome not found in standard locations" -ForegroundColor Red
    Write-Host "Please install Google Chrome from https://www.google.com/chrome/" -ForegroundColor Yellow
}

# Check ChromeDriver
Write-Host "`nChecking ChromeDriver..." -ForegroundColor Yellow
try {
    $chromedriverVersion = & chromedriver --version 2>$null
    if ($chromedriverVersion) {
        Write-Host "✅ ChromeDriver found: $chromedriverVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ ChromeDriver not found or not in PATH" -ForegroundColor Red
    Write-Host "Installing ChromeDriver via npm..." -ForegroundColor Yellow
    npm install chromedriver --save-dev
}

# Check Node.js and npm
Write-Host "`nChecking Node.js and npm..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null

if ($nodeVersion) {
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

if ($npmVersion) {
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
}

# Check if wmic is available (this is the problematic command)
Write-Host "`nChecking wmic availability..." -ForegroundColor Yellow
try {
    $wmicTest = & wmic.exe /? 2>$null
    Write-Host "✅ wmic.exe is available" -ForegroundColor Green
} catch {
    Write-Host "❌ wmic.exe not found - this is the source of your error!" -ForegroundColor Red
    Write-Host "This is a known issue on some Windows systems" -ForegroundColor Yellow
    Write-Host "The direct configuration should bypass this issue" -ForegroundColor Cyan
}

# Check project dependencies
Write-Host "`nChecking project dependencies..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    $seleniumDeps = @("selenium-webdriver", "chromedriver", "mocha", "chai")
    
    foreach ($dep in $seleniumDeps) {
        if ($packageJson.devDependencies.$dep -or $packageJson.dependencies.$dep) {
            $version = $packageJson.devDependencies.$dep ?? $packageJson.dependencies.$dep
            Write-Host "✅ $dep: $version" -ForegroundColor Green
        } else {
            Write-Host "❌ $dep: not found" -ForegroundColor Red
        }
    }
} else {
    Write-Host "❌ package.json not found" -ForegroundColor Red
}

Write-Host "`n=== Recommendations ===" -ForegroundColor Green
Write-Host "1. Use the direct test configuration: npm run test:e2e:direct" -ForegroundColor Cyan
Write-Host "2. If issues persist, try headless mode" -ForegroundColor Cyan
Write-Host "3. Make sure Chrome is updated to the latest version" -ForegroundColor Cyan
Write-Host "4. The wmic.exe error is bypassed in the direct configuration" -ForegroundColor Cyan

Write-Host "`n=== Next Steps ===" -ForegroundColor Green
Write-Host "Run: npm run test:e2e:direct" -ForegroundColor Yellow
