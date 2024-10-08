import fs from 'fs';
import path from 'path';

function checkPermissions(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    try {
      const stats = fs.statSync(filePath);
      const mode = stats.mode.toString(8);
      console.log(`${mode.slice(-3)} ${filePath}`);
      if (stats.isDirectory()) {
        checkPermissions(filePath);
      }
    } catch (error) {
      console.error(`Error checking ${filePath}:`, error.message);
    }
  });
}

console.log('Checking project directory permissions:');
checkPermissions('.');

// Check available space
console.log('\nChecking available space:');
const freeSpace = require('os').freemem() / 1024 / 1024;
console.log(`Free memory: ${freeSpace.toFixed(2)} MB`);