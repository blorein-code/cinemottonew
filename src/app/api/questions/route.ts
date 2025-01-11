import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Question from '@/models/Question';

// Get all questions
export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find({}).lean();
    
    const formattedQuestions = questions.map(question => ({
      id: question._id.toString(),
      question_text: question.question_text,
      options: question.options,
      difficulty: question.difficulty,
      category: question.category,
      point: question.point
    }));

    return NextResponse.json({ questions: formattedQuestions });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
} 