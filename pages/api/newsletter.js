import { connectDatabase, insertDoc } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "DB connection Failed" });
      return;
    }
    try {
      await insertDoc(client, "email", { email: email });
      res.status(201).json({ message: "Valid" });
    } catch (e) {
      res.status(500).json({ message: "Couldnt insert" });
    }
    client.close();
  }
}

export default handler;
