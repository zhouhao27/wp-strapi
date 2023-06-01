module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/wp-webhook',
     handler: 'wp-webhook.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    },
    {
      method: 'GET',
      path: '/wp-webhook',
      handler: 'wp-webhook.verifyAction', 
    }
  ],
};

