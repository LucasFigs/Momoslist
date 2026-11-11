/** Accept only local paths, never protocol-relative, encoded separators or schemes. */
export function safeRedirect(value: unknown, fallback = "/dashboard"): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\x00-\x20]/.test(value)
  )
    return fallback;
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("//") || /[\\\x00-\x20]/.test(decoded))
      return fallback;
    const url = new URL(value, "https://local.invalid");
    return url.origin === "https://local.invalid"
      ? url.pathname + url.search + url.hash
      : fallback;
  } catch {
    return fallback;
  }
}
