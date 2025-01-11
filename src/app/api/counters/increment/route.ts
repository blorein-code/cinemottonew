import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/";
const client = new MongoClient(uri);
const db = client.db("QualifiedAudience");
const countersCollection = db.collection("counters");

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();
    
    if (type !== 'participants' && type !== 'certificates') {
      return NextResponse.json({ error: 'Invalid counter type' }, { status: 400 });
    }

    const counterName = type === 'participants' ? 'quiz_attempts' : 'certificates_generated';
    
    const result = await countersCollection.updateOne(
      { _name: counterName },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, updated: result.modifiedCount > 0 });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json({ error: 'Failed to increment counter' }, { status: 500 });
  }
} 