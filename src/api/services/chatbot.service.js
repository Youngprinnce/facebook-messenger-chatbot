const { handleMessage } = require('../../utils/chatbot');
const { FB_VERIFY_TOKEN } = require('../../config/config');
const Chatbot = require('../models/chatbot.model');

module.exports = {
  Chatbot() {
    return {
      async postWebhook(body) {
        try {
          // Check the webhook event is from a Page subscription
          if (body.object === 'page') {

            // Iterate over each entry - there may be multiple if batched
            body.entry.forEach(function(entry) {
    
              // Get the webhook event. entry.messaging is an array, but 
              // will only ever contain one event, so we get index 0
              let webhook_event = entry.messaging[0];
      
              // Get the sender PSID
              let sender_psid = webhook_event.sender.id;
        
              // Check if the event is a message or postback and
              // pass the event to the appropriate handler function
              if (webhook_event.message) {
                  handleMessage(sender_psid, webhook_event.message);        
              }
            });
          }
        } catch (ex) {
          return { error: ex };
        }
      },

      async getWebhook({mode, token}) {
        try {
          // Checks if a token and mode is in the query string of the request
            if (mode && token) {

                // Your verify token. Should be a random string.
                  let VERIFY_TOKEN = FB_VERIFY_TOKEN;
            
                // Checks the mode and token sent is correct
                if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                
                    // Responds with the challenge token from the request
                    console.log('WEBHOOK_VERIFIED');
                }
            }
        } catch (ex) {
          return { error: ex };
        }
      },
    };
  },
};