module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/webhook',
     handler: 'webhook.exampleAction',
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

