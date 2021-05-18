const handler = (req, res) => {
  const { eventId } = req.query;

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
    const newComment = { id: new Date().toISOString(), email, name, text };
    console.log(newComment);
    res.status(201).json({ message: "Valid" });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "1", name: "sa", text: "sasdas" },
      { id: "2", name: "sa", text: "sasdas" },
      { id: "3", name: "sa", text: "sasdas" },
    ];
    res.status(200).json({ comments: dummyList });
  }
};

export default handler;

//mongodb+srv://sarthak927:sarthak927@cluster0.i3ews.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
