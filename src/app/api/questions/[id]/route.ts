import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Question from '@/models/Question';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const objectId = new ObjectId(params.id);
    const question = await Question.findOne({ _id: objectId }).lean();

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const formattedQuestion = {
      id: question._id.toString(),
      question_text: question.question_text,
      options: question.options,
      difficulty: question.difficulty,
      category: question.category,
      point: question.point
    };

    return NextResponse.json({ questions: [formattedQuestion] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
} 