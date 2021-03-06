const handlers = require('./handlers');

function removLastChar(str) {
  const arr = str.split('');
  arr.pop();
  return arr.join('');
}

function getHanleVal(req) {
  let reqPath = req.path;
  if (req.path.endsWith('/')) {
    reqPath = removLastChar(reqPath);
  }
  const handleKey = req.method + ' ' + reqPath;

  return handlers[handleKey] || handlers[handleKey + '/']
}

function getHandler(handleVal) {
  let handler;

  if (typeof handleVal === 'function') {
    handler = handleVal;
  } else if (Object.prototype.toString.call(handleVal)) {
    handler = function (rep, res) {
      res.json(handleVal);
    };
  } else {
    handler = function (rep, res) {
      res.send(handleVal);
    };
  }
  return handler;
}

async function mock(app) {
  // app.use(express.json())
  app.use(function (req, res, next) {
    try {
      if (req.path.indexOf('.') !== -1) {
        return next();
      }
      const handleVal = getHanleVal(req);
      if (handleVal) {
        const handler = getHandler(handleVal);
        return handler(req, res);
      }
    } catch (error) {
      console.log(error);
    }
    next();
  });
  
}

module.exports = mock;