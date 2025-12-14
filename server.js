import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve all files in current folder (so index.html, scripts, etc. are found)
app.use(express.static(path.resolve(".")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html")); // <- This makes sure Render finds index.html
});

app.listen(PORT, () => {
  console.log(`🚀 Artemis server running on port ${PORT}`);
});
