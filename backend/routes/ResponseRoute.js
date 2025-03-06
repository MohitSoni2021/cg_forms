import UserResponse from "../models/UserResponse.model.js";
import express from 'express'


const ResponseRoutes = express.Router();

ResponseRoutes.post("/SubmitForm", async (req, res) => {
  const { email, userResponse, formId } = req.body;

  // Validate required fields
  if (!email || !userResponse || !formId) {
    return res.status(400).json({
      message: 'Missing required fields: email, userResponse, or formId',
    });
  }

  const newResponse = new UserResponse({
    email,
    user_response: userResponse,
    form_id: formId,
  });

  try {
    await newResponse.save();
    return res.status(201).json({
      message: 'Form submitted successfully',
      response: newResponse,
    });
  } catch (error) {
    console.error('Error saving response:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});





export default ResponseRoutes;