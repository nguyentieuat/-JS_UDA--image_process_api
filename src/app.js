"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const indexRouter_1 = __importDefault(require("./api/routes/indexRouter"));
const imageRouter_1 = __importDefault(require("./api/routes/imageRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
// Add routes
app.use(indexRouter_1.default);
app.use('/api/images', imageRouter_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map