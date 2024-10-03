'use strict'
const webpack = require("webpack");

/* eslint-disable no-unused-vars */
module.exports = (config) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config

  config.plugins.push(
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'GET_ZENODO_SECRET',
      'NEXT_ENDPOINT',
    ])
  )

  // Important: return the modified config
  return config
}
