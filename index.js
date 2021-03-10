const path = require('path');

const mock = require('./util/mock');
const parseFile = require('./util/parseFile');
const watch = require('./util/watch');

const MOCK_DIR = path.join(process.cwd(), './mock');

module.exports = (api, options) => {
  const argv = process.argv;
  if (argv.indexOf('--mock') === -1) {
    const index = argv.indexOf('--mode');
    if (index === -1) {
      return
    }
    if (argv[index + 1] !== 'mock') {
      return
    }
  }

  api.chainWebpack((webpackConfig) => {
    webpackConfig
      .devServer
      .set('before', mock)
  });

  parseFile(MOCK_DIR);

  watch(MOCK_DIR);
}
