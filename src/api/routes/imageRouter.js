"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = __importDefault(require("../controllers/imageController"));
const imageRouter = express_1.default.Router();
imageRouter.use("/", imageController_1.default.getImage);
imageRouter.get("/list_available", imageController_1.default.getListAvailable);
exports.default = imageRouter;
//# sourceMappingURL=imageRouter.js.map