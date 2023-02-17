module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/blockByVuid/:vuid',
      handler: 'block.findByVuid',
    },
  ],
}
