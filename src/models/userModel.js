import { db } from '../config/db.js';

const usersCollection = db.collection('users');

export async function createUser(user) {
  return await usersCollection.insertOne(user);
}

export async function findUserByPhone(phone) {
  return await usersCollection.findOne({ phone });
}
