import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';

try {
  console.log('Starting build process...');
  
  // Run TypeScript compiler
  console.log('Running TypeScript compiler...');
  execSync('tsc', { stdio: 'inherit' });
  
  // Run Vite build
  console.log('Running Vite build...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  
  // Check available space
  console.log('Checking available space...');
  const freeSpace = os.freemem() / 1024 / 1024;
  console.log(`Free memory: ${freeSpace.toFixed(2)} MB`);
  
  // List files in the current directory
  console.log('Listing files in the current directory:');
  const files = fs.readdirSync('.');
  files.forEach(file => {
    const stats = fs.statSync(file);
    console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  });
  
  // Check write permissions
  console.log('Checking write permissions...');
  try {
    fs.writeFileSync('test-write-permissions.txt', 'test');
    fs.unlinkSync('test-write-permissions.txt');
    console.log('Write permissions OK');
  } catch (writeError) {
    console.error('Write permissions error:', writeError.message);
  }
  
  process.exit(1);
}