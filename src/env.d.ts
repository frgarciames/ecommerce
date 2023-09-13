/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_SWELL_STORE_ID: string;
  readonly SWELL_API_KEY: string;
  readonly PUBLIC_SWELL_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
