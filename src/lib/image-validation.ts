import sharp from "sharp";
/** Decode and re-encode: reject spoofed MIME, corrupt files, animations and pixel bombs; strip metadata. */
export async function sanitizeImage(bytes: Buffer) {
  const image = sharp(bytes, {
    limitInputPixels: 20_000_000,
    failOn: "warning",
    animated: false,
  });
  const metadata = await image.metadata();
  if (
    !metadata.format ||
    !["jpeg", "png", "webp"].includes(metadata.format) ||
    (metadata.pages ?? 1) > 1
  )
    throw new Error("InvalidImage");
  return image.rotate().webp({ quality: 85 }).toBuffer();
}
