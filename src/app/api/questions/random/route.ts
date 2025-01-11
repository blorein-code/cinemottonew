import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/";
const client = new MongoClient(uri);
const db = client.db("QualifiedAudience");
const questionsCollection = db.collection("questions");

interface Question {
  _id: string;
  question_text: string;
  options: Array<{
    option_text: string;
    is_correct: boolean;
  }>;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  point: number;
}

export async function GET() {
  try {
    // Rastgele 10 soru seç
    const rawQuestions = await questionsCollection.aggregate<Question>([
      { $sample: { size: 10 } }
    ]).toArray();

    // Soruları beklenen formata dönüştür
    const questions = rawQuestions.map(q => ({
      id: q._id.toString(),
      question_text: q.question_text,
      options: q.options,
      difficulty: q.difficulty,
      category: q.category,
      point: q.point
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching random questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
} 