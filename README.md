# osmanturan.com-website

[![wercker status](https://app.wercker.com/status/6c4288f68ab606b409ead7303b951382/s/ "wercker status")](https://app.wercker.com/project/byKey/6c4288f68ab606b409ead7303b951382)

Website for [osmanturan.com](https://osmanturan.com) which is built with [TypeScript](https://www.typescriptlang.org/) + [Webpack](https://webpack.js.org/) + [Hugo](https://gohugo.io/) and deployed with [Netlify](https://www.netlify.com/) + [Wercker](https://app.wercker.com/).

## Prerequisites
- [Node.js](https://nodejs.org/)
- [NPM](https://npmjs.com/)
- [Hugo](https://gohugo.io/) (optional)

## Building

Run following command in a directory to clone repository:

```
$ git clone https://github.com/osman-turan/osmanturan.com-website.git
```

After cloning the repository, run following command at the project root to install missing [NPM](https://npmjs.com/) packages:

```
$ npm install
```

If you don't have [Hugo](https://gohugo.io/) installed, you can download a local copy by running following command. Build script will automatically use local copy of [Hugo](https://gohugo.io/) when it's available:

```
$ npm run setup
```

And finally, you can run following command to perform a full build:

```
$ npm run build
```

After a successful build, all of required files for deployment can be found in `bin` folder.

### Build Script Details
Build script is written in [JavaScript](https://en.wikipedia.org/wiki/JavaScript) for [Node.js](https://nodejs.org/) environment.

Usage:

```
$ node build.js <switches>
```

Available switches:

| Switch           | Description                                                                                                          |
|------------------|----------------------------------------------------------------------------------------------------------------------|
| `--setup`        | Initialize the project for building for the first time. Currently installs local copy of [Hugo](https://gohugo.io/). |
| `--clean`        | Cleans all build directories.                                                                                        |
| `--build-assets` | Builds assets (TypeScript, SCSS etc. files) and copies static files.                                                 |
| `--build-hugo`   | Invokes [Hugo](https://gohugo.io/) build.                                                                            |

There are 2 environment variables to enable production build. Otherwise development mode is used:

| Environment Variable | Accepted Values | Description                                                                                                                   |
|----------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------|
| `NODE_ENV`           | `production`    | Enables production build for [Node.js](https://nodejs.org/) related build steps (such as [Webpack](https://webpack.js.org/)). |
| `HUGO_ENV`           | `production`    | Enables production build for [Hugo](https://gohugo.io/) build step.                                                           |

Example full build for development:

```
$ node build.js --setup --clean --build-assets --build-hugo
```

Example full build for production on Unix:

```
$ NODE_ENV=production HUGO_ENV=production node build.js --setup --clean --build-assets --build-hugo
```

Example full build for production on Windows:

```
$ set NODE_ENV=production && set HUGO_ENV=production && node build.js --setup --clean --build-assets --build-hugo
```

For fast iteration during development with multi-platform support, several commands were added to `scripts` section of `package.json`:

| Command                | Description                                                                                                    |
|------------------------|----------------------------------------------------------------------------------------------------------------|
| `npm run clean`        | Cleans build directories.                                                                                      |
| `npm run build-assets` | Builds assets for production.                                                                                  |
| `npm run build-hugo`   | Builds site with [Hugo](https://gohugo.io/) for production.                                                    |
| `npm run watch-hugo`   | Starts development mode with live reload by using local copy of [Hugo](https://gohugo.io/).                    |
| `npm run build`        | Builds assets and site for production.                                                                         |
| `npm run rebuild`      | Combination of `npm run clean` and `npm run build`.                                                            |
| `npm run dev`          | Starts a [Node.js](https://nodejs.org/) web server on `bin` folder.                                            |
| `npm run setup`        | Initializes build environment for the first time. Currently installs local copy of [Hugo](https://gohugo.io/). |

## Deployment Environments

There are 2 deployment environments:

- **Development:** [Netlify](https://www.netlify.com/) backed deployments are tracked with `develop` branch. All pull-requests should be created against this branch. After a successful build, an auto generated preview address will be provided for your pull-request.
- **Production:** [Wercker](https://app.wercker.com/) backed deployments are tracked with `master` branch. You shouldn't create pull-requests against this branch. Only successful branches which are merged into `develop` branch will be merged into `master` branch and eventually deployed into [production environment](http://osmanturan.com/).

## Contributing

Please create an issue in [the GitHub repository](https://github.com/osman-turan/osmanturan.com-website) for suggestions and questions. Pull-requests are much appreciated. But, please make sure you have created an issue before working on any pull-requests.

## Authors

- [Osman Turan](https://osmanturan.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
