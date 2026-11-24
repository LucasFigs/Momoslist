import { beforeEach, describe, expect, it, vi } from "vitest";
import Image, { getImageProps } from "next/image";

const state = vi.hoisted(() => ({ failedSrc: null as string | null }));
vi.mock("react", async (importOriginal) => ({
  ...await importOriginal<typeof import("react")>(),
  useState: () => [state.failedSrc, (value: string) => { state.failedSrc = value; }],
}));
import { GiftImage, isPublicGiftImageUrl } from "@/components/gift-image";

const host = "wiirvczljhoskngovxer.supabase.co";
const prefix = `https://${host}/storage/v1/object/public/gift-images/`;
const valid = `${prefix}events/test/photo.webp`;
beforeEach(() => { state.failedSrc = null; });

describe("strict public Storage optimizer exception", () => {
  it.each([
    valid,
    `${valid}?v=2`,
    `${valid}?download=photo.webp&v=3`,
    `${prefix}events/test/foto%20da%20lista.webp`,
  ])("allows only the intended public object: %s", (src) => {
    expect(isPublicGiftImageUrl(src)).toBe(true);
  });
  it.each([
    `https://${host}/storage/v1/object/public/other/photo.webp`,
    `https://${host}/storage/v1/object/sign/gift-images/photo.webp?token=secret`,
    "https://other.supabase.co/storage/v1/object/public/gift-images/photo.webp",
    valid.replace("https:", "http:"),
    valid.replace(host, `${host}.evil.invalid`),
    valid.replace(host, `evil-${host}`),
    valid.replace(host, `user:password@${host}`),
    valid.replace(host, `${host}:444`),
    `${prefix}../other/photo.webp`,
    `${prefix}%2e%2e/other/photo.webp`,
    `${prefix}events/../photo.webp`,
    `${prefix}events/%2E./photo.webp`,
    `${prefix}events%2f..%2fphoto.webp`,
    `${prefix}events%5cphoto.webp`,
    `${prefix}%252e%252e/photo.webp`,
    `${prefix}events//photo.webp`,
    `${prefix}events/%00photo.webp`,
    `${prefix}events/%ZZphoto.webp`,
    `${prefix}events/`,
    prefix,
    valid.replace("gift-images/", "gift-images-evil/"),
    valid.replace("https://", "https:\\"),
    `${valid}#fragment`,
    `${valid}?redirect=https://evil.invalid`,
    `${valid}?token=not-allowed`,
    ` ${valid}`,
    "not a URL", "", null, undefined,
  ])("rejects bypasses and keeps the existing optimization policy: %s", (src) => {
    expect(isPublicGiftImageUrl(src)).toBe(false);
  });
});

describe("GiftImage rendering", () => {
  it.each([true, false])("preserves sizing, fit, priority and direct src (fill=%s)", (fill) => {
    const sizing = fill ? { fill: true as const, sizes: "(max-width: 640px) 50vw, 300px" } : { width: 128, height: 80 };
    const element = GiftImage({ src: valid, alt: "Foto", ...sizing, fit: "contain", priority: true, className: "rounded-lg" });
    expect(element.type).toBe(Image);
    expect(element.props).toMatchObject({ src: valid, alt: "Foto", unoptimized: true, priority: true });
    expect(element.props.className).toContain("object-contain");
    expect(element.props.className).toContain("rounded-lg");
    expect(element.props).toMatchObject(sizing);
    const actual = getImageProps(element.props).props;
    expect(actual.src).toBe(valid);
    expect(actual.srcSet).toBeUndefined();
    expect(actual.src).not.toContain("/_next/image");
  });
  it.each([true, false])("retains optimization for other public buckets/projects (fill=%s)", (fill) => {
    const sizing = fill ? { fill: true as const } : { width: 64, height: 64 };
    for (const src of [valid.replace("gift-images/", "other/"), valid.replace(host, "other.supabase.co"), valid.replace("https:", "http:")]) {
      expect(GiftImage({ src, alt: "Outra", ...sizing }).props.unoptimized).toBe(false);
    }
  });
  it.each([null, "", "invalid URL", "https://", "javascript:alert(1)", "//evil.invalid/photo.webp"])("uses fallback for absent/invalid src: %s", (src) => {
    const element = GiftImage({ src, alt: "Teste", fill: true });
    expect(element.type).toBe("div");
    expect(element.props.role).toBe("img");
    expect(element.props["aria-label"]).toBe("Teste sem imagem");
  });
  it("handles Storage errors and retries when the source changes", () => {
    const element = GiftImage({ src: valid, alt: "Teste", width: 64, height: 64 });
    element.props.onError();
    const failed = GiftImage({ src: valid, alt: "Teste", width: 64, height: 64, showBrokenHint: true });
    expect(failed.type).toBe("div");
    expect(failed.props["aria-label"]).toContain("não pôde ser carregada");
    expect(GiftImage({ src: `${valid}?v=2`, alt: "Nova", fill: true }).type).toBe(Image);
  });
  it("keeps the default lazy loading and cover fit", () => {
    const element = GiftImage({ src: valid, alt: "Foto", width: 64, height: 64 });
    expect(getImageProps(element.props).props.loading).toBe("lazy");
    expect(element.props.className).toContain("object-cover");
  });
});
