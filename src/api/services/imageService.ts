import { promises as fs } from "fs";
import path from "path";
import FileUtils from "../utils/fileUtils";
import { Params } from "../utils/parametersInterface";

export default class ImageService {
  // Default paths
  private static imagesFullPath = path.resolve(
    __dirname,
    "../../../public/assets/images/full"
  );
  private static imagesThumbPath = path.resolve(
    __dirname,
    "../../../public/assets/images/thumb"
  );

  /**
   * Get images available
   * @returns
   */
  static async getAvailableImages(): Promise<string[]> {
    try {
      return (await fs.readdir(this.imagesFullPath)).map(
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
      return (await fs.readdir(this.imagesThumbPath)).map(
        (filename: string): string => filename.split(".")[0]
      );
    } catch {
      return [];
    }
  }

  /**
   * Check name image existed`
   * @param filename
   * @returns
   */
  static async isImageAvailable(filename = ""): Promise<boolean> {
    if (!filename) {
      return false; // Fail early
    }
    return (await this.getAvailableImages()).includes(filename);
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
    return (await this.getAvailableImagesThumb()).includes(filename);
  }
  /**
   * Get image
   * @param params
   * @returns
   */
  static async getImage(params: Params): Promise<null | string> {
    console.log(params)
    if (!params.filename) {
      return null;
    }

    if (params.filename && params.width && params.height) {
      if (
        !(await this.isImageThumbAvailable(
          `${params.filename}-${params.width}x${params.height}`
        ))
      ) {
        await this.createImageThumb(params);
      }
    }

    const thisPath: string =
      params.width && params.height
        ? path.resolve(
            this.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(this.imagesFullPath, `${params.filename}.jpg`);

    // Check this existed
    try {
      await fs.access(thisPath);
      return thisPath;
    } catch {
      return null;
    }
  }

  /**
   * Create thumb folder
   */
  static async createThumbFolder(): Promise<void> {
    try {
      await fs.access(this.imagesThumbPath);
      // Path already available
    } catch {
      fs.mkdir(this.imagesThumbPath);
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
    await this.createThumbFolder();

    const filePathImageFull: string = path.resolve(
      this.imagesFullPath,
      `${params.filename}.jpg`
    );
    const filePathImageThumb: string = path.resolve(
      this.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    console.log(`Creating thumb ${filePathImageThumb}`);
    // Resize original image and store as thumb
    return await FileUtils.processImage({
      source: filePathImageFull,
      target: filePathImageThumb,
      width: parseInt(params.width),
      height: parseInt(params.height),
    });
  }
}
