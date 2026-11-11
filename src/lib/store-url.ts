export function safeStoreUrl(value: string | null | undefined): string | null {
  const input = value?.trim();
  if (!input || !/^https?:\/\//i.test(input) || /[\\\u0000-\u0020\u007f]/.test(input)) return null;
  try {
    const url = new URL(input);
    return url.hostname && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
