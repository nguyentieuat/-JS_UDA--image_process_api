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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const image_process_1 = __importDefault(require("./image_process"));
class File {
  /**
   * Get images available
   * @returns
   */
  static getAvailableImages() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return (yield fs_1.promises.readdir(File.imagesFullPath)).map(
          (filename) => filename.split(".")[0]
        );
      } catch (_a) {
        return [];
      }
    });
  }
  /**
   * Get images available thumb
   * @returns
   */
  static getAvailableImagesThumb() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return (yield fs_1.promises.readdir(File.imagesThumbPath)).map(
          (filename) => filename.split(".")[0]
        );
      } catch (_a) {
        return [];
      }
    });
  }
  /**
   * Check name image existed
   * @param filename
   * @returns
   */
  static isImageAvailable(filename = "") {
    return __awaiter(this, void 0, void 0, function* () {
      if (!filename) {
        return false; // Fail early
      }
      return (yield File.getAvailableImages()).includes(filename);
    });
  }
  /**
   * Check name image thumb existed
   * @param filename
   * @returns
   */
  static isImageThumbAvailable(filename = "") {
    return __awaiter(this, void 0, void 0, function* () {
      if (!filename) {
        return false; // Fail early
      }
      return (yield File.getAvailableImagesThumb()).includes(filename);
    });
  }
  /**
   * Get image
   * @param params
   * @returns
   */
  static getImage(params) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!params.filename) {
        return null;
      }
      if (params.filename && params.width && params.height) {
        if (
          !(yield File.isImageThumbAvailable(
            `${params.filename}-${params.width}x${params.height}`
          ))
        ) {
          yield File.createImageThumb(params);
        }
      }
      const filePath =
        params.width && params.height
          ? path_1.default.resolve(
              File.imagesThumbPath,
              `${params.filename}-${params.width}x${params.height}.jpg`
            )
          : path_1.default.resolve(
              File.imagesFullPath,
              `${params.filename}.jpg`
            );
      // Check file existed
      try {
        yield fs_1.promises.access(filePath);
        return filePath;
      } catch (_a) {
        return null;
      }
    });
  }
  /**
   * Create thumb folder
   */
  static createThumbFolder() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield fs_1.promises.access(File.imagesThumbPath);
        // Path already available
      } catch (_a) {
        fs_1.promises.mkdir(File.imagesThumbPath);
      }
    });
  }
  /**
   * Create image thumb
   * @param params
   * @returns
   */
  static createImageThumb(params) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!params.filename || !params.width || !params.height) {
        return null;
      }
      const width = parseInt(params.width || "");
      const height = parseInt(params.height || "");
      if (
        Number.isNaN(width) ||
        width < 1 ||
        Number.isNaN(height) ||
        height < 1
      ) {
        return null;
      }
      // Make sure that thumb path is available
      yield File.createThumbFolder();
      const filePathImageFull = path_1.default.resolve(
        File.imagesFullPath,
        `${params.filename}.jpg`
      );
      const filePathImageThumb = path_1.default.resolve(
        File.imagesThumbPath,
        `${params.filename}-${params.width}x${params.height}.jpg`
      );
      console.log(`Creating thumb ${filePathImageThumb}`);
      // Resize original image and store as thumb
      return yield (0, image_process_1.default)({
        source: filePathImageFull,
        target: filePathImageThumb,
        width: parseInt(params.width),
        height: parseInt(params.height),
      });
    });
  }
}
// Default paths
File.imagesFullPath = path_1.default.resolve(
  __dirname,
  "../../../assets/images/full"
);
File.imagesThumbPath = path_1.default.resolve(
  __dirname,
  "../../../assets/images/thumb"
);
exports.default = File;
