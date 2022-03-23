const { Chatbot } = require('../services/chatbot.service');

const postWebhook = async (req, res) => {
  try {
    if (!req.body || !req.body.entry[0] || !req.body.entry[0].messaging) {
      return console.error("no entries on received body");
    }
    
    // Parse the request body from the POST
    let body = req.body;
    await Chatbot().postWebhook(body);

    // Return a '200 OK' response to all events
    res.status(200).json({data: {}, success: 'true', message: 'Webhook received successfully'});
    
  } catch (err) {
    console.log(err);
  }
};

const getWebhook = async (req, res) => {
  try {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    await Chatbot().getWebhook({mode, token});
    
    res.status(200).json({data: {}, success: 'true', message: challenge});
    
  } catch (err) {
    console.log(err);
  }
};

const allMessages = async (req, res) => {
  try {

    
    
  } catch (err) {
    console.log(err);
  }
};

const getSingleMessage = async (req, res) => {
  try {

    
    
  } catch (err) {
    console.log(err);
  }
};

const summary = async (req, res) => {
  try {

  
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  postWebhook,
  getWebhook,
  allMessages,
  getSingleMessage,
  summary,
}