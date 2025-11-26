/// <reference types="vite/client" />

interface ImportMeta {
  glob<T = { default: string }>(
    pattern: string,
    options?: { eager?: boolean }
  ): Record<string, T>;
}

