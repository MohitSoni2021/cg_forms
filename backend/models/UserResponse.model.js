import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    
    email : {
      type : String,
      required : true
    },
    user_response : {
      type : Object
    },
    form_id : {
      type : String,
      required : true
    }

  }, {Timestamp:true});

  const UserResponse = mongoose.model('UserResponse', responseSchema);
  export default UserResponse;