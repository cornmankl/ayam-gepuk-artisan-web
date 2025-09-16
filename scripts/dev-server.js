#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Ayam Gepuk Artisan Development Server...');
console.log('📍 Server will be available at: http://localhost:5175');
console.log('🔧 Press Ctrl+C to stop the server\n');

const viteProcess = spawn('npx', ['vite', '--port', '5175', '--host'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
});

viteProcess.on('error', error => {
  console.error('❌ Failed to start development server:', error.message);
  process.exit(1);
});

viteProcess.on('close', code => {
  if (code !== 0) {
    console.error(`❌ Development server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  viteProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development server...');
  viteProcess.kill('SIGTERM');
  process.exit(0);
});
