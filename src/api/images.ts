import express from "express";
import File from "./utils/file";
import path from "path";

// query segments
interface Params {
  filename?: string;
  width?: string;
  height?: string;
}
/**
 * Validate parameters
 * @param params
 * @returns
 */
const validate = async (
  params: Params
): Promise<null | Map<string, string>> => {
  const map = new Map();
  // Check file available
  if (!(await File.isImageAvailable(params.filename))) {
    map.set("type", "fileName");
    return map.set(
      "fileName",
      path.join(__dirname, "../templates/list_available.html")
    );
  }

  // No size values
  if (!params.width && !params.height) {
    return null;
  }

  // Check for valid width value
  const width: number = parseInt(params.width || "");
  if (Number.isNaN(width) || width < 1) {
    map.set("type", "errorWidth");
    return map.set(
      "errorWidth",
      "Please provide a positive numerical value for the 'width' query segment."
    );
  }

  // Check for valid height value
  const height: number = parseInt(params.height || "");
  if (Number.isNaN(height) || height < 1) {
    map.set("type", "errorHeight");
    return map.set(
      "errorHeight",
      "Please provide a positive numerical value for the 'height' query segment."
    );
  }
  return null;
};

const images: express.Router = express.Router();

images.get(
  "/",
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check whether request can be worked with
    const validationMessage: null | Map<string, string> = await validate(
      request.query
    );
    if (validationMessage) {
      const type = validationMessage.get("type");
      let message = "";
      switch (type) {
        case "fileName":
          message = validationMessage.get(type)!;
          response.sendFile(message);
          break;
        case "errorWidth":
        case "errorHeight":
          message = validationMessage.get(type)!;
          response.send(message);
          break;
        default:
      }
      return;
    }

    const pathFile: null | string = await File.getImage(request.query);
    if (pathFile) {
      response.sendFile(pathFile);
    } else {
      response.sendFile(
        path.join(__dirname, "../templates/list_available.html")
      );
    }
  }
);

images.get(
  "/list_available",
  (request: express.Request, response: express.Response): void => {
    response.sendFile(path.join(__dirname, "../templates/list_available.html"));
  }
);
export default images;
