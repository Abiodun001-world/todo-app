const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], // Only these values allowed
    default: 'pending', 
  },
}, { timestamps: true }); 

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
