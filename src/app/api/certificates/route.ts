import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Sertifika kaydetme
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, surname, score, correctAnswers } = body;

    const client = await clientPromise;
    const db = client.db("cinemottos");
    
    const result = await db.collection("certificates").insertOne({
      name,
      surname,
      score,
      correctAnswers,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      success: true, 
      certificateId: result.insertedId 
    });
  } catch (error) {
    console.error('Error saving certificate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Sertifika getirme
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("cinemottos");
    
    const certificate = await db.collection("certificates").findOne({
      _id: new ObjectId(id)
    });

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 