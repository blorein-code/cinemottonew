import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI || "mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/");

export async function POST(request: Request) {
  try {
    const { name, surname, score, correct } = await request.json();

    // Puanı kontrol et
    const finalScore = Number(score) > 100 ? 100 : Number(score);
    const correctCount = Number(correct);

    // MongoDB'ye bağlan
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || "QualifiedAudience");
    const certificatesCollection = db.collection("certificates");

    // Sertifika bilgilerini kaydet
    const result = await certificatesCollection.insertOne({
      name,
      surname,
      score: finalScore,
      correct: correctCount,
      createdAt: new Date()
    });

    // Sertifika sayacını artır
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/counters/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'certificates' })
    });

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId.toString(),
      redirectUrl: `/certificate/view/${result.insertedId.toString()}`
    });
  } catch (error) {
    console.error('Error saving certificate:', error);
    return NextResponse.json({ success: false, error: 'Failed to save certificate' }, { status: 500 });
  } finally {
    await client.close();
  }
} 