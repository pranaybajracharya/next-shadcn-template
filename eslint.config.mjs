import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "prettier"
    ),
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      semi: ["error"],
      quotes: ["error", "double"],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[.*": "KEBAB_CASE",
        },
      ],
    },
  },
  globalIgnores(["node_modules", ".next"]),
]);
