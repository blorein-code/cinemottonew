import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  option_text: {
    type: String,
    required: true,
  },
  is_correct: {
    type: Boolean,
    required: true,
  }
});

const QuestionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionSchema],
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  category: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  }
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema); 