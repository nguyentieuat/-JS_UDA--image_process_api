import { promises as fs } from "fs";
import path from "path";
import processImage from "./image_process";

// query segments
interface Params {
  filename?: string;
  width?: string;
  height?: string;
}
export default class File {
  // Default paths
  static imagesFullPath = path.resolve(
    __dirname,
    "../../../assets/images/full"
  );
  static imagesThumbPath = path.resolve(
    __dirname,
    "../../../assets/images/thumb"
  );

  /**
   * Get images available
   * @returns
   */
  static async getAvailableImages(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesFullPath)).map(
        (filename: string): string => filename.split(".")[0]
      );
    } catch {
      return [];
    }
  }

  /**
   * Get images available thumb
   * @returns
   */
  static async getAvailableImagesThumb(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesThumbPath)).map(
        (filename: string): string => filename.split(".")[0]
      );
    } catch {
      return [];
    }
  }

  /**
   * Check name image existed
   * @param filename
   * @returns
   */
  static async isImageAvailable(filename = ""): Promise<boolean> {
    if (!filename) {
      return false; // Fail early
    }
    return (await File.getAvailableImages()).includes(filename);
  }

  /**
   * Check name image thumb existed
   * @param filename
   * @returns
   */
  static async isImageThumbAvailable(filename = ""): Promise<boolean> {
    if (!filename) {
      return false; // Fail early
    }
    return (await File.getAvailableImagesThumb()).includes(filename);
  }
  /**
   * Get image
   * @param params
   * @returns
   */
  static async getImage(params: Params): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    if (params.filename && params.width && params.height) {
      if (
        !(await File.isImageThumbAvailable(
          `${params.filename}-${params.width}x${params.height}`
        ))
      ) {
        await File.createImageThumb(params);
      }
    }

    const filePath: string =
      params.width && params.height
        ? path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(File.imagesFullPath, `${params.filename}.jpg`);

    // Check file existed
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  /**
   * Create thumb folder
   */
  static async createThumbFolder(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath);
      // Path already available
    } catch {
      fs.mkdir(File.imagesThumbPath);
    }
  }

  /**
   * Create image thumb
   * @param params
   * @returns
   */
  static async createImageThumb(params: Params): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const width: number = parseInt(params.width || "");
    const height: number = parseInt(params.height || "");

    if (
      Number.isNaN(width) ||
      width < 1 ||
      Number.isNaN(height) ||
      height < 1
    ) {
      return null;
    }

    // Make sure that thumb path is available
    await File.createThumbFolder();

    const filePathImageFull: string = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );
    const filePathImageThumb: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    console.log(`Creating thumb ${filePathImageThumb}`);
    // Resize original image and store as thumb
    return await processImage({
      source: filePathImageFull,
      target: filePathImageThumb,
      width: parseInt(params.width),
      height: parseInt(params.height),
    });
  }
}
