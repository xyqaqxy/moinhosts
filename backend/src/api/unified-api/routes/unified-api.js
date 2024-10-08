module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/unified-api/call',
      handler: 'unified-api.call',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};