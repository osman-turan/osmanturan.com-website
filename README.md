# osmanturan.com-website

Website for [osmanturan.com](https://osmanturan.com) which is built with [Astro](https://astro.build/) and deployed with [Vercel](https://vercel.com/).

## Prerequisites

- [Node.js](https://nodejs.org/) 22.12 or newer (see `.nvmrc`)
- [Yarn](https://yarnpkg.com/) 4 (pinned via the `packageManager` field)

## Getting Started

Run the following command in a directory to clone the repository:

```bash
git clone https://github.com/osman-turan/osmanturan.com-website.git
```

After cloning the repository, run the following command at the project root to install missing dependencies:

```bash
yarn install
```

And finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the website.

## Scripts

| Command        | Description                                         |
| -------------- | --------------------------------------------------- |
| `yarn dev`     | Start the dev server at `localhost:4321`            |
| `yarn build`   | Type-check, then build the static site into `dist/` |
| `yarn preview` | Serve the contents of `dist/` locally               |
| `yarn check`   | Type-check `.astro` and `.ts` files                 |
| `yarn format`  | Format the repository with Prettier                 |

The site is fully static: `yarn build` emits plain HTML, CSS and assets, with no
adapter and no server runtime.

## Deployment Environments

There are 2 deployment environments:

- **[Development](http://osmanturan.vercel.app/):** Deployments are tracked with `develop` branch. All pull-requests should be created against this branch. After a successful build, an auto generated preview address will be provided for your pull-request.
- **[Production](http://osmanturan.com/):** Deployments are tracked with `master` branch. You shouldn't create pull-requests against this branch. Only successful branches which are merged into `develop` branch will be merged into `master` branch and eventually deployed into [production environment](http://osmanturan.com/).

## Notes

### `@emnapi/runtime`

`@emnapi/runtime` is listed in `devDependencies` but is never imported by this
project. It exists to satisfy a missing peer dependency upstream:
`@astrojs/astro2tsx` (pulled in by `@astrojs/check`) depends on
`@napi-rs/wasm-runtime`, which declares both `@emnapi/core` and
`@emnapi/runtime` as non-optional peers — but `astro2tsx` only supplies
`@emnapi/core`. Every package that _does_ declare `@emnapi/runtime` is gated on
`cpu=wasm32`, so it never installs on a normal platform.

Without it, importing `@astrojs/check` throws `ERR_MODULE_NOT_FOUND`, Astro's
CLI swallows that error, and `astro check` reports the misleading
"@astrojs/check is not installed" — which fails `yarn build`.

Remove it once `@astrojs/astro2tsx` declares the peer correctly.

### Fonts

Noto Sans is self-hosted. `src/assets/fonts/*.woff2` are Google's variable
subset slices, committed to the repository, with the `@font-face` rules
written by hand in `src/styles/global.css`.

Astro's Fonts API fetches them at build time instead, but it treats a failed
download as a warning rather than an error, so a network problem during a
Vercel build produces a successful deploy with no webfont. Committed files
keep the build offline and reproducible.

To update them, read the URLs out of the Google Fonts CSS and re-download.
A browser user agent is required; `curl`'s default gets a TTF-only response.

```bash
curl -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \
  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400..700"
```

The `unicode-range` values in `global.css` must match that response. The
`wght@400..700` request returns weight-axis-only files, which is why the
width axis of Noto's variable build is never downloaded.

Noto Sans is licensed under the SIL Open Font License 1.1 (`OFL.txt`).

### PostCSS `from` warning

`yarn build` prints "A PostCSS plugin did not pass the `from` option to
`postcss.parse`". It originates in Vite's CSS Modules handling of `composes:`
and is cosmetic: asset URLs inside the composed stylesheets are still
rewritten and fingerprinted correctly.

## Contributing

Please create an issue in [the GitHub repository](https://github.com/osman-turan/osmanturan.com-website) for suggestions and questions. Pull-requests are much appreciated. But, please make sure you have created an issue before working on any pull-requests.

## Authors

- [Osman Turan](https://osmanturan.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
