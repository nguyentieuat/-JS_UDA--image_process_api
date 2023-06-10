"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_1 = __importDefault(require("./utils/file"));
const path_1 = __importDefault(require("path"));
/**
 * Validate parameters
 * @param params
 * @returns
 */
const validate = (params) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let map = new Map();
    // Check file available
    if (!(yield file_1.default.isImageAvailable(params.filename))) {
      map.set("type", "fileName");
      return map.set(
        "fileName",
        path_1.default.join(__dirname, "../templates/list_available.html")
      );
    }
    // No size values
    if (!params.width && !params.height) {
      return null;
    }
    // Check for valid width value
    const width = parseInt(params.width || "");
    if (Number.isNaN(width) || width < 1) {
      map.set("type", "errorWidth");
      return map.set(
        "errorWidth",
        "Please provide a positive numerical value for the 'width' query segment."
      );
    }
    // Check for valid height value
    const height = parseInt(params.height || "");
    if (Number.isNaN(height) || height < 1) {
      map.set("type", "errorHeight");
      return map.set(
        "errorHeight",
        "Please provide a positive numerical value for the 'height' query segment."
      );
    }
    return null;
  });
const images = express_1.default.Router();
images.get("/", (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Check whether request can be worked with
    const validationMessage = yield validate(request.query);
    if (validationMessage) {
      const type = validationMessage.get("type");
      let message = "";
      switch (type) {
        case "fileName":
          message = validationMessage.get(type);
          response.sendFile(message);
          break;
        case "errorWidth":
        case "errorHeight":
          message = validationMessage.get(type);
          response.send(message);
          break;
        default:
      }
      return;
    }
    const pathFile = yield file_1.default.getImage(request.query);
    if (pathFile) {
      response.sendFile(pathFile);
    } else {
      response.sendFile(
        path_1.default.join(__dirname, "../templates/list_available.html")
      );
    }
  })
);
images.get("/list_available", (request, response) => {
  response.sendFile(
    path_1.default.join(__dirname, "../templates/list_available.html")
  );
});
exports.default = images;
