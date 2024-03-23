'use strict'

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  config.plugins.push(
    new webpack.default.EnvironmentPlugin([
      'NODE_ENV',
      'GET_ZENODO_SECRET',
      'NEXT_ENDPOINT',
    ])
  )

  // Important: return the modified config
  return config
}
