import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import sharp from "sharp";
const storage = vi.hoisted(() => ({
  upload: vi.fn(),
  publicUrl: vi.fn(),
  rate: vi.fn(),
}));
vi.mock("@/lib/rate-limit", () => ({ takeRateLimit: storage.rate }));
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({ upload: storage.upload, getPublicUrl: storage.publicUrl }),
    },
  }),
}));
import { uploadImage } from "@/lib/supabase-storage";
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://storage.example.invalid");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "synthetic-test-key");
  storage.rate.mockResolvedValue(true);
  storage.upload.mockResolvedValue({ error: null });
  storage.publicUrl.mockReturnValue({
    data: { publicUrl: "https://storage.example.invalid/synthetic.webp" },
  });
});
afterEach(() => vi.unstubAllEnvs());
describe("image upload boundary (isolated SDK, real decoder)", () => {
  it("uploads decoded WebP bytes under the event folder without overwriting", async () => {
    const png = await sharp({
      create: { width: 8, height: 8, channels: 3, background: "red" },
    })
      .png()
      .toBuffer();
    const result = await uploadImage(
      new File([new Uint8Array(png)], "photo.png", { type: "image/png" }),
      "events/test/cover",
    );
    expect(result).toEqual({
      success: true,
      url: "https://storage.example.invalid/synthetic.webp",
    });
    const [path, bytes, options] = storage.upload.mock.calls[0];
    expect(path).toMatch(/^events\/test\/cover\/[a-f0-9-]+\.webp$/);
    expect((await sharp(bytes).metadata()).format).toBe("webp");
    expect(options).toEqual({ contentType: "image/webp", upsert: false });
  });
  it("never uploads a spoofed image even with a permitted MIME", async () => {
    expect(
      (
        await uploadImage(
          new File(["<html>not an image</html>"], "bad.png", {
            type: "image/png",
          }),
          "events/test",
        )
      ).success,
    ).toBe(false);
    expect(storage.upload).not.toHaveBeenCalled();
  });
  it("rejects oversized files before touching storage", async () => {
    expect(
      (
        await uploadImage(
          new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.png", {
            type: "image/png",
          }),
          "events/test",
        )
      ).success,
    ).toBe(false);
    expect(storage.upload).not.toHaveBeenCalled();
  });
  it("fails closed when credentials are missing", async () => {
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    expect(
      (
        await uploadImage(
          new File(["data"], "a.png", { type: "image/png" }),
          "events/test",
        )
      ).success,
    ).toBe(false);
    expect(storage.upload).not.toHaveBeenCalled();
  });
  it("blocks repeated uploads before decoding or sending", async () => {
    storage.rate.mockResolvedValue(false);
    expect(
      (
        await uploadImage(
          new File(["data"], "a.png", { type: "image/png" }),
          "events/test",
        )
      ).success,
    ).toBe(false);
    expect(storage.upload).not.toHaveBeenCalled();
  });
});
