import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid" });
      return;
    }

    const client = new MongoClient(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db("events");
    const result = await db.collection("emails").insertOne({ email: email });

    res.status(201).json({ message: "Valid" });
  }
}

export default handler;
