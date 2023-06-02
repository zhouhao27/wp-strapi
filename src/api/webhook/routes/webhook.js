module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/webhook',
      handler: 'webhook.postAction',
      //  config: {
      //    policies: [],
      //    middlewares: [],
      //  },
    },
    {
      method: 'GET',
      path: '/webhook',
      handler: 'webhook.verifyAction',
    }
  ],
};

