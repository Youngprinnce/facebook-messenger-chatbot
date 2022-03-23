const chatBotRoute = require('../../config/routerConfig');
const {
  postWebhook, getWebhook, allMessages, getSingleMessage, summary,
} = require('../controllers/chatbot.controller');

chatBotRoute.post('/webhook', postWebhook);
chatBotRoute.get('/webhook', getWebhook);
chatBotRoute.get('/messages', allMessages);
chatBotRoute.get('/messages/:id', getSingleMessage);
chatBotRoute.get('/summary', summary);

module.exports = chatBotRoute;
