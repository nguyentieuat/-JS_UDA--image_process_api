import express, { Express } from "express";
import dotenv from "dotenv";
import indexRouter from "./api/routes/indexRouter";
import imageRouter from "./api/routes/imageRouter";

dotenv.config();

const app: Express = express();
const port = 8080;

// Add routes
app.use(indexRouter)

app.use('/api/images',imageRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
