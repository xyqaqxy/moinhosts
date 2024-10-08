const fs = require('fs');
const path = require('path');

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function moveFile(source, destination) {
  if (fs.existsSync(source)) {
    fs.renameSync(source, destination);
  }
}

// 创建前端和后端目录
createDir('frontend');
createDir('backend');

// 移动前端文件
const frontendFiles = ['index.html', 'vite.config.ts', 'tsconfig.json'];
frontendFiles.forEach(file => moveFile(file, path.join('frontend', file)));

// 移动后端文件和目录
const backendItems = ['src', 'config', 'api'];
backendItems.forEach(item => moveFile(item, path.join('backend', item)));

console.log('Restructuring completed.');