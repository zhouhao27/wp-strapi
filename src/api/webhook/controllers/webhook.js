'use strict';

/**
 * A set of functions called "actions" for `webhook`
 */
const axios = require('axios');

module.exports = {
  postAction: async (ctx, next) => {
    console.log('postAction')
    console.log(ctx.request.body);


    const entries = ctx.request.body.entry;
    console.log(JSON.stringify(entries));

    // TODO: Constants, refactor the code, complete and error handling
    // parsing data from WhatsApp Cloud API (webhook)
    entries.forEach(entry => {
      const changes = entry.changes
      // console.log(JSON.stringify(changes));
      changes.forEach(change => {
        if (change.field === 'messages') {
          const messages = change.value.messages
          const phoneNumberId = change.value.metadata.phone_number_id

          messages.forEach(message => {
            // console.log(JSON.stringify(message));
            if (message.type === 'text') {
              const body = message.text.body
              const to = message.from
              const idMessage = message.id

              // send back
              axios({
                method: "POST", // Required, HTTP method, a string, e.g. POST, GET
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phoneNumberId +
                  "/messages?access_token=" +
                  'EAAUwoVY47WIBAHZB1SG1lqmQNdMGPWh1Nf9F9xzSx6F4Wnd9KxhB0HCllMLtBeiL3vDMBofTbi9Lh9CRYmZCgIN0Ov7pvYONSl09GTOzuGIvZCggZA53SIZCnLqDMZCgEDLTvzUzjmZBo86sRp9J6qA8fQM7VHcAqZCHfEKoIF2cG0XVG7COqh10',
                data: {
                  messaging_product: "whatsapp",
                  to: to,
                  text: { body: "Ack: " + body },
                },
                headers: { "Content-Type": "application/json" },
              });
            }
          })
        }
      })
    });

    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  verifyAction: async (ctx, next) => {
    console.log("verifyAction")

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
