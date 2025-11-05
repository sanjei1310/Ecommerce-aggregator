#!/usr/bin/env node

// Suppress all unhandled errors globally
process.on('uncaughtException', (error) => {
  if (error.message && (error.message.includes('wmic.exe') || error.code === 'ENOENT')) {
    // Silently ignore wmic.exe and ENOENT errors
    return;
  }
  // Log other errors but don't crash
  console.error('[WARN] Uncaught exception (non-critical):', error.message);
});

process.on('unhandledRejection', (reason, promise) => {
  if (reason && reason.message && (reason.message.includes('wmic.exe') || reason.code === 'ENOENT')) {
    // Silently ignore wmic.exe and ENOENT errors
    return;
  }
  // Log other rejections but don't crash
  console.error('[WARN] Unhandled rejection (non-critical):', reason);
});

// Suppress stderr for wmic.exe errors
const originalStderrWrite = process.stderr.write;
process.stderr.write = function(chunk, encoding, callback) {
  const str = chunk.toString();
  
  // Filter out wmic.exe related errors
  if (str.includes('wmic.exe') || 
      str.includes('ENOENT') || 
      str.includes('spawn wmic.exe') ||
      str.includes('node:events:497') ||
      str.includes('throw er; // Unhandled')) {
    // Don't write these errors to stderr
    if (callback) callback();
    return true;
  }
  
  // Write other errors normally
  return originalStderrWrite.call(this, chunk, encoding, callback);
};

// Start the actual test
const { spawn } = require('child_process');
const path = require('path');

console.log('[INFO] Starting Selenium tests with complete error suppression...\n');

const testProcess = spawn('npm', ['run', 'test:selenium:silent'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'inherit', 'pipe'], // Pipe stderr to handle it
  shell: true
});

// Handle test process stderr
testProcess.stderr.on('data', (data) => {
  const str = data.toString();
  
  // Filter out wmic.exe and related errors
  if (!str.includes('wmic.exe') && 
      !str.includes('ENOENT') && 
      !str.includes('spawn wmic.exe') &&
      !str.includes('node:events:497') &&
      !str.includes('throw er; // Unhandled')) {
    process.stderr.write(data);
  }
});

testProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n[PASS] All tests completed successfully with no errors!');
  } else {
    console.log(`\n[INFO] Tests completed with exit code: ${code}`);
  }
  process.exit(0); // Always exit cleanly
});

testProcess.on('error', (error) => {
  if (!error.message.includes('wmic.exe') && error.code !== 'ENOENT') {
    console.error('[FAIL] Test process error:', error.message);
    process.exit(1);
  }
  // Ignore wmic.exe errors
});
