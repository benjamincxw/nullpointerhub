import { ImageResponse } from "next/og";
import { ogImageAlt, ogImageContentType, ogImageSize, OgImageContent } from "@/lib/og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
