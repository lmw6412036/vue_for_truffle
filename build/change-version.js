let config = require('../package');
const fs = require('fs');
const path = require('path');
module.exports = () => {
  let {version} = config;
  version = version.split('.').map((item, index, arr) => index + 1 < arr.length ? item : parseInt(item) + 1).join('.');
  config.version = version;
  fs.writeFile(path.join(__dirname, '..', 'package.json'), JSON.stringify(config, null, 4), () => {
  });
}
