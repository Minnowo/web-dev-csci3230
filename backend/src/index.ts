import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express 🚀");
  console.log("hello world");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
