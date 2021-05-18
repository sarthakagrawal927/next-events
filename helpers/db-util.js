import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = new MongoClient(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client;
}

export async function insertDoc(client, collection, document) {
  const db = client.db("events");
  const result = await db.collection(collection).insertOne(document);
}

export async function getDoc(client, collection, sort, filter) {
  const db = client.db("events");
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
