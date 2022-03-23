const request = require('request');
const { FB_PAGE_TOKEN } = require('../config/config');
const Chatbot = require('../api/models/chatbot.model');
const daysleft = require('./daysleft');
const { logger } = require('./logger');

const sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response,
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": FB_PAGE_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                logger.info(body);
                resolve('done!')
            });
        } catch (e) {
            reject(e);
        }
    });
};

const sendTypingOn = (sender_psid) => {
    return new Promise ((resolve, reject) => {
       try{
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "sender_action":"typing_on"
        };

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v6.0/me/messages",
            "qs": { "access_token": FB_PAGE_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            logger.info(body);
            resolve('done!')
        });
       } catch (e) {
           reject(e);
       }
    });
};

const handlePostback = async (sender_psid, received_postback) => {
    let response;
    const chatbot = await Chatbot.findOne({user: sender_psid});

    const birthday = chatbot.messages[1].birthday;

    const result = daysleft(birthday);

    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": `There are ${result} days left until your next birthday` }
    } else if (payload === 'no') {
      response = { "text": "Goodbye 👋" }
    }

    chatbot.messages.push({option: payload});
    await chatbot.save();
    // Send the message to acknowledge the postback
    await sendTypingOn(sender_psid);
    await sendMessage(sender_psid, response);
}

const handleMessage = async (sender_psid, received_message) => {
    
    // Checks if the message contains text
    if (received_message.text) {   
        const chatbot = await Chatbot.findOne({user: sender_psid});

        if(!chatbot || chatbot === null) {
            await sendMessage(sender_psid, {
                "text": 'Hi',
            });

            await sendMessage(sender_psid, {
                "text": 'What is your name?',
            });

            await Chatbot.create({user: sender_psid});
            return;
        }else{
            if(chatbot.state === 0) {
                chatbot.state = 1;
                chatbot.name = received_message.text;
                chatbot.messages = [{name: received_message.text}];
                await chatbot.save();
                await sendTypingOn(sender_psid);
                await sendMessage(sender_psid, {
                    "text": `Hello ${received_message.text}, when is your birthday? please answer in the format of YYYY-MM-DD`,
                });
            } else if(chatbot.state === 1) {
                chatbot.messages.push({birthday: received_message.text});
                chatbot.state = 2;
                await chatbot.save();
                await sendTypingOn(sender_psid);
                await sendMessage(sender_psid, {
                    "text": 'Do you want to know how many days left until your birthday?',
                    "quick_replies": [
                        {
                            "content_type":"text",
                            "title": '✅ Yes',
                            "payload":"yes"
                        },
                        {
                            "content_type":"text",
                            "title": '⛔ No',
                            "payload":"no"
                        }
                    ]
                });
            } else if(chatbot.state === 2) {
                if (received_message.quick_reply && received_message.quick_reply.payload) {
                    handlePostback(sender_psid, received_message.quick_reply);
                }
            }
            return;
        } 
    } 
}

module.exports = {
    handleMessage,
    handlePostback,
}