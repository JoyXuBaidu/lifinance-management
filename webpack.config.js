var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry:'./controllers/users.js',
  output: {
    path: path.resolve(__dirname,'dist')
  }
}