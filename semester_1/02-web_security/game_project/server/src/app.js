import express from "express";
import { PrismaClient } from "@prisma/client";
import e from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  const { username } = req.body;

  try {
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (typeof username !== "string") {
      return res.status(400).json({ message: "Username must be a string" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }

    if (username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be at most 20 characters" });
    }

    if (!username.match(/^[a-zA-Z0-9_]+$/)) {
      return res.status(400).json({
        message: "Username must only contain letters, numbers, and underscores",
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
