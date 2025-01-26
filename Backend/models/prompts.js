const mongoose = require('mongoose');
const {UserModel}  = require("./user")
const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompts: [
    {
      question: {
        type: String,
        required: true, // e.g., "I'm weirdly attracted to"
      },
      answer: {
        type: String,
        required: true, // e.g., "People who don’t have social media accounts."
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  photos: [
    {
      url: {
        type: String,
        required: true // URL of the photo
      },
      caption: {
        type: String, // e.g., "My good side"
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Prompt', promptSchema);
