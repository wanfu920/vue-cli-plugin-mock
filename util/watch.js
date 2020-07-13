const fs = require('fs')
const path = require('path')
const parseFile = require('./parseFile');
const handlers = require('./handlers');

const timeout = 500;
const timeIds = {};

function fileChange(filePath) {
  if (timeIds[filePath]) {
    clearTimeout(timeIds[filePath]);
  }
  timeIds[filePath] = setTimeout(function () {
    const preFileObj = require.cache[filePath] || {};
    delete require.cache[filePath];
    for (const handleKey of Object.keys(preFileObj)) {
      delete handlers[handleKey];
    }
    parseFile(filePath);
  }, timeout);
}

module.exports = function (filePath) {
  fs.watch(filePath, (eventType, filename) => {
    if (filename) {
      fileChange(path.join(filePath, filename));
    }
  });
}
