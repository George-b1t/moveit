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
  const { username, 
          level, 
          challengesCompleted, 
          currentExperience 
  } = request.body;

  console.log({
    username,
    level,
    challengesCompleted,
    currentExperience
  })

  const db = await connectToDatabase(process.env.MONGODB_URI);
  
  const collection = db.collection('original-subscribers');

  await collection.findOneAndUpdate({
    username
  }, {
    '$set': {
      username,
      level,
      challengesCompleted,
      currentExperience
    }
  }).then(() => {
    return response.status(201).json({
      message: 'ok'
    })
  }).catch(() => {
    return response.status(501)
  });
}