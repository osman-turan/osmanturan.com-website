// @ts-check
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://osmanturan.com",
  trailingSlash: "never",

  // Astro 7 defaults this to "jsx", which strips whitespace between inline
  // elements and would turn `<a>post</a> <em>now</em>` into "postnow".
  compressHTML: true,

  integrations: [sitemap()],

  vite: {
    build: {
      // `light-dark()` is the floor for this design (Safari 17.5 / Chrome 123),
      // so lightningcss is told to target that and nothing older. Left
      // unbounded it polyfills `light-dark()` into a pile of var() fallbacks;
      // set too low it would also have to keep the old media query syntax.
      cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"],
    },
    resolve: {
      // tsconfig `paths` covers TS/JS/Astro imports, but Vite does not apply
      // them inside CSS -- CSS Modules `composes: ... from "@/styles/..."`
      // needs this explicit alias.
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  },
});
