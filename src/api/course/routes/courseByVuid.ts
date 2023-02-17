module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/courseByVuid/:vuid',
      handler: 'course.findByVuid',
    },
  ],
}
