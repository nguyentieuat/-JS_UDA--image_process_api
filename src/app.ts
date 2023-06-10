import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import path from "path";

dotenv.config();

const app: Express = express();
const port = 8080;

// Add routes
app.use(routes);

app.get("/", (request: express.Request, response: express.Response): void => {
  console.log(__dirname);
  // This could be done by serving views ... Just quick and dirty for now :-)
  response.sendFile(path.join(__dirname, "./templates/index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
