const path = require('path');
 
module.exports = {
  entry: './node/mysql/index.js',
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node' // 这是最关键的
};