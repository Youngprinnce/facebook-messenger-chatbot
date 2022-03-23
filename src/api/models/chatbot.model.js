const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatbotSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  messages: {
    type: Array,
  },
  state: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
});

module.exports = mongoose.model('Chatbot', chatbotSchema);
