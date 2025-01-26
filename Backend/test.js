// /**
//  * The function checks if all keys in the `dummyData` object are included in the `ALLOWED_UPDATES`
//  * array using the `every()` function in JavaScript.
//  * @param x - x represents each key in the dummyData object when iterating over them using the every()
//  * function.
//  * @returns The code is checking if all keys in the `dummyData` object are included in the
//  * `ALLOWED_UPDATES` array. The `keyArray.every((x)=>ALLOWED_UPDATES.includes(x))` statement returns
//  * `true` if all keys in the `dummyData` object are present in the `ALLOWED_UPDATES` array, otherwise
//  * it returns `false`.
//  */
// const dummyData = {
//     id: 1,
//     //1. This is How every() function works in Javascript
    
//     name: "John Doe",
//     username: "johndev123",
//     email: "john.doe@example.com",
//     isActive: true,
//     profile: {
//       bio: "Full-stack developer and tech enthusiast.",
//       skills: ["JavaScript", "React", "Node.js", "CSS"],
//       experience: [
//         {
//           company: "TechCorp",
//           role: "Frontend Developer",
//           years: 2,
//         },
//         {
//           company: "CodeHub",
//           role: "Backend Developer",
//           years: 1,
//         },
//       ],
//     },
   
//     createdAt: "2023-12-01T10:00:00Z",
//     updatedAt: "2025-01-22T15:30:00Z",
//   };
  





//     const ALLOWED_UPDATES = [
//         'id',        'name',
//   'username',  'email',
//   'isActive',  'profile',
//   'createdAt', 'updatedAt'
//      ]

//      function a(x){
//        return   ALLOWED_UPDATES.includes(x)
//      }


//      let keyArray = Object.keys(dummyData);

//      console.log(keyArray.every((x)=>ALLOWED_UPDATES.includes(x)));



 
// const validator = require("validator")

// let a = validator.

// console.log(a);


const mongoose = require('mongoose');

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
