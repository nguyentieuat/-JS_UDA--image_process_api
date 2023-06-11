import sharp from "sharp";
import { SharpResizeParams } from "../utils/parametersInterface";

export default class FileUtils {
  /**
   * Process resize image
   * @param params
   * @returns
   */
  static processImage = async (params: SharpResizeParams): Promise<null | string> => {
    try {
      await sharp(params.source)
        .resize(params.width, params.height)
        .toFile(params.target);
      return null;
    } catch {
      return "Image could not be processed.";
    }
  };
}
