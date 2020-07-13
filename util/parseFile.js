const fs = require('fs');
const path = require('path');
const handlers = require('./handlers');

module.exports = function (filePath) {
  try {
    fileStats = fs.statSync(filePath);
  } catch (error) {
    return;
  }

  if (fileStats.isDirectory()) {
    const files = fs.readdirSync(filePath);
    return files.forEach(function (file) {
      parseFile(path.join(filePath, file));
    });
  }

  let fileObj;
  try {
    fileObj = require(filePath);
    if (mockFile && Object.prototype.toString.call(mockFile) === '[object Object]') {
      Object.assign(handlers, mockFile)
    }
  } catch (error) {
    return;
  }
  
}