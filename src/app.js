"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
// Add routes
app.use(index_1.default);
app.get("/", (request, response) => {
  console.log(__dirname);
  // This could be done by serving views ... Just quick and dirty for now :-)
  response.sendFile(path_1.default.join(__dirname, "./templates/index.html"));
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
