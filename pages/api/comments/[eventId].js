import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { eventId } = req.query;
  console.log(req.query);

  const client = new MongoClient(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("events");

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !name ||
      !text ||
      !email.includes("@") ||
      name.trim() === "" ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid" });
      return;
    }
    const newComment = { eventId, email, name, text };

    const result = await db.collection("comments").insertOne(newComment);

    res.status(201).json({ message: "Valid" });
  }
  if (req.method === "GET") {
    const documents = await db
      .collection("comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: documents });
  }
  client.close();
}
