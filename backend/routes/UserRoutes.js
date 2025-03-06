import express from 'express';
import { User } from '../models/User.model.js';
import UserResponse from '../models/UserResponse.model.js';

const UserRouter = express.Router();


UserRouter.get('/', (req, res) => {
    res.send('User Routes');
})

// Route to create a new user
UserRouter.post('/create', async (req, res) => {
  try {
    const { 
      _id,  // Firebase user ID
      name, 
      email 
    } = req.body;

    // Validate required fields
    if (!_id || !name || !email) {
      return res.status(400).json({ 
        message: 'Missing required fields: _id, name, or email' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findById(_id);
    if (existingUser) {
      return res.status(200).json({ 
        message: 'User already exists', 
        user: existingUser 
      });
    }

    // Create new user with empty created_forms
    const newUser = new User({
      _id,
      name,
      email,
      created_forms: []
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully', 
      user: newUser 
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});

UserRouter.post('/:userId/:formId/add-response', async (req, res) => {
  try {
    const { userId, formId } = req.params;
    const { responseId } = req.body;

    // Validate required fields
    if (!responseId) {
      return res.status(400).json({
        message: 'Missing required field: responseId'
      });
    }

    // Find the user and update the response_ids array of the specified form
    const user = await User.findOneAndUpdate(
      { _id: userId, 'created_forms._id': formId },
      { $push: { 'created_forms.$.response_ids': responseId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User or form not found'
      });
    }

    res.status(200).json({
      message: 'Response ID added successfully',
      user
    });

  } catch (error) {
    console.error('Error adding response ID:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});


UserRouter.get('/:userId/:formId/questions', async (req, res) => {
  try {
    const { userId, formId } = req.params;

    // Find the user and get the questions of the specified form
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const form = user.created_forms.id(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ questions: form });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});


// Route to get user details
UserRouter.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});

// Route to get full populated form by userId and formId
UserRouter.get('/:userId/forms/:formId', async (req, res) => {
  try {
    const { userId, formId } = req.params;

    const user = await User.findById(userId).populate({
      path: 'created_forms',
      match: { _id: formId },
      populate: {
        path: 'response_ids',
        model: 'UserResponse'
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const form = user.created_forms.find(f => f._id.toString() === formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});


// Route to delete a form from user's created_forms
UserRouter.delete('/:userId/forms/:formId', async (req, res) => {
  try {
    const { userId, formId } = req.params;

    await UserResponse.deleteMany({ form_id: formId });

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { created_forms: { _id: formId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Form deleted successfully',
      user
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Route to add a new form to user's created_forms
UserRouter.post('/:userId/add-form', async (req, res) => {
  try {
    const { userId } = req.params;
    const formData = req.body

    const user = await User.findOne({_id : userId});
    console.log(user)

    user.created_forms.push(formData);
    await user.save();

    res.status(200).json({
      message: 'Form added successfully',
      form: formData,
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Route to get all forms for a user
UserRouter.get('/:userId/forms', async (req, res) => {
  try {
    
    const { userId } = req.params;
    const user = await User.findOne({_id : userId});

    res.status(200).json({
      message: 'Forms fetched successfully',
      forms: user.created_forms
    });

  } catch (error) {
    
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });

  }
});




export default UserRouter;