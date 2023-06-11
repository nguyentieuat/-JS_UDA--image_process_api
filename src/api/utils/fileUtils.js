"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
class FileUtils {
}
_a = FileUtils;
/**
 * Process resize image
 * @param params
 * @returns
 */
FileUtils.processImage = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(params.source)
            .resize(params.width, params.height)
            .toFile(params.target);
        return null;
    }
    catch (_b) {
        return "Image could not be processed.";
    }
});
exports.default = FileUtils;
//# sourceMappingURL=fileUtils.js.map