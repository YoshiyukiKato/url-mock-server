const path = require('path');
const webpack = require('webpack');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const config = {
  cache : DEBUG,
  debug : DEBUG,

  stats : {
    colors : true,
    reasons : DEBUG,
    hash : VERBOSE,
    version : VERBOSE,
    timings : true,
    chunks : VERBOSE,
    chunkModules : VERBOSE,
    cached : VERBOSE,
    cachedAssets : VERBOSE,
  },

  devtool : DEBUG ? 'cheap-module-eval-source-map'  : false,

  plugins : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV' : `"${process.env.NODE_ENV || (DEBUG ? 'development'  : 'production')}"` }),
      ...(DEBUG ? []  : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress : { screw_ie8 : true, warnings : VERBOSE } }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]),
  ],

  resolve : {
    extensions : ['', '.js'],
  },
  
  module : {
    loaders : [
      { test : /\.js|\.jsx?$/, include : [path.resolve(__dirname, 'src')], loader : 'babel', exclude : /node_modules/},
      //{ test : /\.scss$/, loaders : ["style", "css", "sass"], include : [path.resolve(__dirname, 'src/css')]},
    ],
  },

  entry : {
    index : ["./src/index.js"],
  },

  output : {
    publicPath : '/',
    sourcePrefix : '',
    path : path.join(__dirname, 'dest'),
    filename : '[name].js',
    libraryTarget: "commonjs2"
  },

  target : "node",
};

module.exports = config;
