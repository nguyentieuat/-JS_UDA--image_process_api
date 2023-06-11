"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const indexRouter = express_1.default.Router();
indexRouter.get("/", (request, response) => {
    console.log(__dirname);
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.sendFile(path_1.default.join(__dirname, "../../views/templates/index.html"));
});
exports.default = indexRouter;
//# sourceMappingURL=indexRouter.js.map