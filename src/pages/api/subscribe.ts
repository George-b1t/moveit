import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

interface UserData {
  username: string;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  };

  const client = await MongoClient.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
};

export default async (request: VercelRequest, response: VercelResponse) => {
  const { username } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('original-subscribers');

  const userExists = await collection.findOne({
    username
  });

  if (!userExists) {
    await collection.insertOne({
      username,
      level: 1,
      challengesCompleted: 0,
      currentExperience: 0,
      subscribedAt: new Date(),
    });
  } else {
    return response.status(201).json({
      username: userExists.username,
      level: userExists.level,
      challengesCompleted: userExists.challengesCompleted,
      currentExperience: userExists.currentExperience
    });
  };

  return response.status(201).json({
    username,
    level: 1,
    challengesCompleted: 0,
    currentExperience: 0,
  });
};
