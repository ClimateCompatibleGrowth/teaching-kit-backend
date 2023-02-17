module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/lectureByVuid/:vuid',
      handler: 'lecture.findByVuid',
    },
  ],
}
