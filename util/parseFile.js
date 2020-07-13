const fs = require('fs');
const path = require('path');
const handlers = require('./handlers');

module.exports = function parseFile(filePath) {
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
    if (fileObj && Object.prototype.toString.call(fileObj) === '[object Object]') {
      for (const handleKey of Object.keys(fileObj)) {
        let [method, reqPath] = handleKey.split(' ')
        if (!reqPath) {
          reqPath = method;
          method = 'GET';
        }
        handlers[method.toUpperCase() + ' ' + reqPath] = fileObj[handleKey];
      }
    }
  } catch (error) {
    return;
  }
  
}