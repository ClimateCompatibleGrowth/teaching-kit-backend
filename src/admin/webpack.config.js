'use strict'
const webpack = require("webpack");

/* eslint-disable no-unused-vars */
module.exports = (config) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      NEXT_ENDPOINT: 'http://localhost:3000',
    })
  )

  // Important: return the modified config
  return config
}
