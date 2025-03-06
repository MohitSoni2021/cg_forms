import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    fields: [
      {
        type: { type: String, enum: ['text', 'radio', 'checkbox', 'dropdown', 'short_answer', "paragraph"] },
        question: String,
        options: [String],
        required: Boolean,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });

  const Form = mongoose.model('Form', formSchema);
  export default Form;