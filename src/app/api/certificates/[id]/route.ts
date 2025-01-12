import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient("mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await client.connect();
    const db = client.db("QualifiedAudience");
    const certificatesCollection = db.collection("certificates");

    const certificate = await certificatesCollection.findOne({
      _id: new ObjectId(params.id)
    });

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
} 