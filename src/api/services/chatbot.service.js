/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
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
            body.entry.forEach((entry) => {
              // Get the webhook event. entry.messaging is an array, but
              // will only ever contain one event, so we get index 0
              const webhook_event = entry.messaging[0];

              // Get the sender PSID
              const sender_psid = webhook_event.sender.id;

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

      async getWebhook({ mode, token }) {
        try {
          // Checks if a token and mode is in the query string of the request
          if (mode && token) {
            // Your verify token. Should be a random string.
            const VERIFY_TOKEN = FB_VERIFY_TOKEN;

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

      async allMessages() {
        try {
          const result = await Chatbot.find({});

          if (result.length === 0) return [];

          // loop through results and return only the messages
          const messages = result.map((item) => ({
            messages: item.messages,
            _id: item._id,
          }));
          return messages;
        } catch (ex) {
          return { error: ex };
        }
      },

      async getSingleMessage(id) {
        try {
          const result = await Chatbot.findById(id);

          if (!result) return {};

          return result;
        } catch (ex) {
          return { error: ex };
        }
      },

      async summary() {
        try {
          const results = await Chatbot.find({});

          const data = results.map((item) => ({
            user: item._id,
            name: item.name,
            messages: item.messages,
          }));

          return data;
        } catch (ex) {
          return { error: ex };
        }
      },
    };
  },
};
