import sharp from "sharp";

// query segments
interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

/**
 * Process resize image
 * @param params
 * @returns
 */
const processImage = async (
  params: sharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFile(params.target);
    return null;
  } catch {
    return "Image could not be processed.";
  }
};

export default processImage;
