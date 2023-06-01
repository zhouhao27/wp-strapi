'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order',({strapi}) => ({
  async confirmOrder(ctx, next) {
      ctx.body = 'ok';
      const {id} = ctx.request.params;
      // const user = ctx.state.user;
      // const order = await strapi.entityService.findOne('api::order.order', id);
      // console.log(`order: ${JSON.stringify(order)}`);
      // return id;
      
      console.log('confirmOrder')
      // update the order (confirmed)
      await strapi.entityService.update('api::order.order', id, {        
        data: 
          {
              confirmed: true,
              confirmation_date: new Date()
          }        
      })
      return {
        message: "order confirmed"
      }
  },
  // customize the create
  async create(ctx, next) {
    const user = ctx.state.user;
    console.log(`creating order for user: ${user.username}`)
    const order = await strapi.entityService.create('api::order.order', {
      data: {
        products: ctx.request.body.data.products,
        owner: user.id
      }
    })    
    return { order }
  },

}));

