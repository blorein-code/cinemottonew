import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://berketopcu:KU6RSxg0uj8OTOZk@cluster0.dzmi8.mongodb.net/";
const client = new MongoClient(uri);
const db = client.db("QualifiedAudience");
const countersCollection = db.collection("counters");

interface Counter {
  _id: string;
  count: number;
}

export async function incrementCounter(counterType: 'participants' | 'certificates') {
  try {
    const result = await countersCollection.updateOne(
      { _id: counterType } as any,
      { $inc: { count: 1 } },
      { upsert: true }
    );
    return result.modifiedCount > 0 || result.upsertedCount > 0;
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return false;
  }
}

export async function getCounters() {
  try {
    const participants = await countersCollection.findOne<Counter>({ _id: 'participants' } as any);
    const certificates = await countersCollection.findOne<Counter>({ _id: 'certificates' } as any);
    
    return {
      participants: participants?.count || 0,
      certificates: certificates?.count || 0
    };
  } catch (error) {
    console.error('Error getting counters:', error);
    return { participants: 0, certificates: 0 };
  }
} 