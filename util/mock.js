const handlers = require('./handlers');

async function mock(app) {
  for (const handleKey of Object.keys(handlers)) {
    let [method, reqPath] = handleKey.split(' ')
    if (!reqPath) {
      reqPath = method;
      method = 'GET';
    }

    const handleVal = handlers[handleKey];

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

    app[method.toLowerCase()](reqPath, handler);
  }
}

module.exports = mock;