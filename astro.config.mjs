// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://osmanturan.com",
  trailingSlash: "never",

  // Astro 7 defaults this to "jsx", which strips whitespace between inline
  // elements and would turn `<a>post</a> <em>now</em>` into "postnow".
  compressHTML: true,

  vite: {
    build: {
      // lightningcss otherwise minifies `(min-width: 576px)` into Media
      // Queries Level 4 range syntax `(width >= 576px)`, which browsers older
      // than Safari 16.4 / Chrome 104 skip entirely -- they would lose every
      // breakpoint and render the mobile layout. The Next.js build emitted
      // `min-width`, so this keeps the port visually identical.
      // Revisit in step 2: Popover and light-dark() raise the floor to
      // Safari 17 regardless, at which point this can go.
      cssTarget: ["chrome100", "edge100", "firefox100", "safari16"],
    },
    resolve: {
      // tsconfig `paths` covers TS/JS/Astro imports, but Vite does not apply
      // them inside CSS -- CSS Modules `composes: ... from "@/styles/..."`
      // needs this explicit alias.
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  },
});
