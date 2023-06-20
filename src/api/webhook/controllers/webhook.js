'use strict';

/**
 * A set of functions called "actions" for `webhook`
 */
const axios = require('axios');

module.exports = {
  postAction: async (ctx, next) => {
    console.log('postAction')
    // console.log(ctx.request.body);

    const entries = ctx.request.body.entry;
    console.log(JSON.stringify(entries));

    if (!Array.isArray(entries)) {
      console.log("No entry found")
      return;
    }

    // TODO: Constants, refactor the code, complete and error handling
    // parsing data from WhatsApp Cloud API (webhook)
    entries.forEach(entry => {
      const changes = entry.changes
      // console.log(JSON.stringify(changes));      
      changes.forEach(change => {
        if (change.field === 'messages') {
          const messages = change.value.messages
          const phoneNumberId = change.value.metadata.phone_number_id

          if (!Array.isArray(messages)) {
            console.log("No message found")
            return;
          }

          messages.forEach(message => {
            // console.log(JSON.stringify(message));
            if (message.type === 'text') {
              const body = message.text.body
              const to = message.from
              const idMessage = message.id
              const postToken = 'EAAUwoVY47WIBADkczGhw8ZAJnxvXxZANjnaHqbp3viBSLhnamOSKpifT6SrsglLZCKANxlcsrBHemaZCHePlZA38QMD1ZB13UWcjEdxZAlldV6rK9OLh7U5Jo48W6ENZAj1MuuH46qeI0ln1uVDd2j2PwWG43PiKqXrLo9ZAqH1tH0vdi8rM77SBnqZCeRmbeZBIUXNiiiZCWWVH5gZDZD'
              // permanent token: EAAUwoVY47WIBAHZB1SG1lqmQNdMGPWh1Nf9F9xzSx6F4Wnd9KxhB0HCllMLtBeiL3vDMBofTbi9Lh9CRYmZCgIN0Ov7pvYONSl09GTOzuGIvZCggZA53SIZCnLqDMZCgEDLTvzUzjmZBo86sRp9J6qA8fQM7VHcAqZCHfEKoIF2cG0XVG7COqh10

              // send back
              axios({
                method: "POST", // Required, HTTP method, a string, e.g. POST, GET
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phoneNumberId +
                  "/messages?access_token=" +
                  postToken,
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
