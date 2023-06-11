import express, { Router } from "express";
import ImagesController from "../controllers/imageController";

const imageRouter: Router = express.Router();

imageRouter.use("/", ImagesController.getImage);

imageRouter.get("/list_available", ImagesController.getListAvailable);

export default imageRouter;
