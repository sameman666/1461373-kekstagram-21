const path = require("path");

module.exports = {
  entry: [
    "./js/filter.js",
    "./js/load.js",
    "./js/gallery.js",
    "./js/preview.js",
    "./js/modal.js",
    "./js/effects.js",
    "./js/hashtags.js",
    "./js/userpic.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
