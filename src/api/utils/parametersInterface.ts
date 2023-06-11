export interface Params {
  filename?: string;
  width?: string;
  height?: string;
}

export interface SharpResizeParams {
    source: string;
    target: string;
    width: number;
    height: number;
  }