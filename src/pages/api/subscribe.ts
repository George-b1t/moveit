import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  const { username, password } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('original-subscribers');

  const userExists = await collection.findOne({
    username
  });

  if(userExists && password) {
    const isValidPassword = await bcrypt.compare(password, userExists.password);
    if (isValidPassword) {
      return response.status(201).json({
        username: userExists.username,
        level: userExists.level,
        challengesCompleted: userExists.challengesCompleted,
        currentExperience: userExists.currentExperience
      });
    } else {
      console.log('cheguei aqui')
      return response.status(401).json({
        message: 'UNAUTHORIZED'
      })
    }
  } else {
    if (!userExists) {
      await collection.insertOne({
        username,
        password: bcrypt.hashSync(password, 8),
        level: 1,
        challengesCompleted: 0,
        currentExperience: 0,
        subscribedAt: new Date(),
      });
      return response.status(201).json({
        username,
        level: 1,
        challengesCompleted: 0,
        currentExperience: 0,
      });
    } else {
      return response.status(201).json({
        username: userExists.username,
        level: userExists.level,
        challengesCompleted: userExists.challengesCompleted,
        currentExperience: userExists.currentExperience,
      });
    }
  }
};
