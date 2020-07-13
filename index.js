const path = require('path');

const mock = require('./util/mock');
const parseFile = require('./util/parseFile');
const watch = require('./util/watch');

const MOCK_DIR = path.join(process.cwd(), './mock');

module.exports = (api, options) => {
  if (process.argv.indexOf('--mock') === -1) return;

  api.chainWebpack((webpackConfig) => {
    webpackConfig
      .devServer
      .set('before', mock)
  });

  parseFile(MOCK_DIR);

  watch(MOCK_DIR);
}
