import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/";
const client = new MongoClient(uri);
const db = client.db("QualifiedAudience");
const countersCollection = db.collection("counters");

export async function GET() {
  try {
    const participantsCounter = await countersCollection.findOne({ _name: 'quiz_attempts' });
    const certificatesCounter = await countersCollection.findOne({ _name: 'certificates_generated' });

    return NextResponse.json({
      participants: participantsCounter?.count || 0,
      certificates: certificatesCounter?.count || 0
    });
  } catch (error) {
    console.error('Error fetching counters:', error);
    return NextResponse.json({ error: 'Failed to fetch counters' }, { status: 500 });
  }
} 