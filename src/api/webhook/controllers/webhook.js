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
    console.log(ctx.request.body)
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};