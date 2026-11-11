import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
const compat = new FlatCompat({
  baseDirectory: fileURLToPath(new URL(".", import.meta.url)),
});
export default [
  { ignores: ["node_modules/**", ".next/**", ".local/**"] },
  ...compat.extends("next/core-web-vitals"),
];
