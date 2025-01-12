import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient("mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/");

export async function POST(request: Request) {
  try {
    const { name, surname, score, correct } = await request.json();

    // MongoDB'ye bağlan
    await client.connect();
    const db = client.db("QualifiedAudience");
    const certificatesCollection = db.collection("certificates");

    // Sertifika bilgilerini kaydet
    const result = await certificatesCollection.insertOne({
      name,
      surname,
      score,
      correct,
      createdAt: new Date()
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