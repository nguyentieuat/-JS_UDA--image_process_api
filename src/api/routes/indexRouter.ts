import express, { Router } from "express";
import path from "path";

const indexRouter: Router = express.Router();

indexRouter.get("/", (request: express.Request, response: express.Response): void => {
  console.log(__dirname);
  // This could be done by serving views ... Just quick and dirty for now :-)
  response.sendFile(path.join(__dirname, "../../views/templates/index.html"));
});

export default indexRouter;
