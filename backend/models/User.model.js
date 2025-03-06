import mongoose from "mongoose";



const FormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        type: {
          type : String,
        },
        question: {
          type : String
        },
        options: {
          type : [String]
        },
        required: {
          type : Boolean
        }
      }
    ], // Array of questions
    expiration: { type: String, required: true },
    response_ids: {
      type: [{ type: mongoose.Types.ObjectId, ref: 'UserResponse' }],
      default: []
    }

  }, {timestamps: true});


  // {
  //   title: 'Untitled Form',
  //   description: 'Form Description',
  //   questions: [
  //     {
  //       type: 'text',
  //       question: 'Your Name',
  //       options: [Array],
  //       required: true
  //     },
  //     {
  //       type: 'number',
  //       question: 'Your Age',
  //       options: [Array],
  //       required: true
  //     }
  //   ],
  //   expiration: '2025-03-06T06:05:00.000Z'
  // }

const UserSchema = new mongoose.Schema({
    _id : { // This is the Firebase userid
        type : String, 
        required : true,
        unique : true
    },
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    created_forms : [
        FormSchema
    ]
})


export const User = mongoose.model("User", UserSchema);