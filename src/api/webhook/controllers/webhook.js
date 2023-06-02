'use strict';

/**
 * A set of functions called "actions" for `webhook`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    console.log('exampleAction')
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  verifyAction: async (ctx, next) => {
    console.log("verifyAction")
    console.log(ctx.request.query)

    // TODO: Put token in environment
    if (
      ctx.request.query['hub.mode'] == 'subscribe' &&
      ctx.request.query['hub.verify_token'] == 'MY_TOKEN'
    ) {
      ctx.body = ctx.request.query['hub.challenge'];
    } else {
      ctx.body = 'Failed to verify webhook';
    }
  }
};
