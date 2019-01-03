const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");
const fsExtra = require("fs-extra");

const BinWrapper = require("bin-wrapper");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const argv = require("minimist")(process.argv.slice(2));

const HUGO_LOCAL_PATH = "tools/hugo";
const HUGO_LOCAL_VERSION = 0.53;

function isBuildFlagSet(flag) {
  return argv && argv[flag];
}

function getBuildMode() {
  return process.env.NODE_ENV || "development";
}

function isProductionMode() {
  return getBuildMode() === "production";
}

function isWin32() {
  return process.platform === "win32";
}

function spawnAsync(cmd, args, options) {
  return new Promise((resolve, reject) => {
    var proc = spawn(cmd, args, options);
    proc.stdout.on("data", chunk => {
      console.log(chunk.toString());
    });
    proc.stderr.on("data", chunk => {
      console.error(chunk.toString());
    });
    proc.on("error", reject).on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function copyAsync(source, target) {
  console.log(`Copying: "${source}" --> "${target}"`);
  return new Promise((resolve, reject) => {
    fsExtra.copy(source, target, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function removeAsync(directory) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(directory)) {
      resolve();
      return;
    }

    fsExtra.remove(directory, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function downloadHugoAsync() {
  const downloadPath = path.resolve(__dirname, HUGO_LOCAL_PATH);
  const githubReleaseUrl = `https://github.com/gohugoio/hugo/releases/download/v${HUGO_LOCAL_VERSION}/`;
  const githubReleaseUrlPrefix = `${githubReleaseUrl}hugo_${HUGO_LOCAL_VERSION}_`;

  await removeAsync(downloadPath);

  console.log(`Downloading Hugo ${HUGO_LOCAL_VERSION}...`);
  await new BinWrapper()
    // Windows
    .src(`${githubReleaseUrlPrefix}Windows-64bit.zip`, "win32", "x64")
    .src(`${githubReleaseUrlPrefix}Windows-32bit.zip`, "win32", "x86")

    // Linux
    .src(`${githubReleaseUrlPrefix}Linux-64bit.tar.gz`, "linux", "x64")
    .src(`${githubReleaseUrlPrefix}Linux-32bit.tar.gz`, "linux", "x86")

    // MacOS
    .src(`${githubReleaseUrlPrefix}macOS-64bit.tar.gz`, "darwin", "x64")
    .src(`${githubReleaseUrlPrefix}macOS-32bit.tar.gz`, "darwin", "x86")

    // Download
    .dest(downloadPath)
    .download();
}

async function cleanBuildDirectoriesAsync() {
  console.log("Cleaning build directories...");
  await removeAsync("./bin");
  await removeAsync("./site/assets");
  await removeAsync("./site/static");
}

async function createBuildDirectoriesAsync() {
  console.log("Creating build directories...");
  await fsExtra.mkdirs("./bin");
  await fsExtra.mkdirs("./site/assets");
  await fsExtra.mkdirs("./site/assets/assets");
  await fsExtra.mkdirs("./site/assets/assets/css");
  await fsExtra.mkdirs("./site/assets/assets/js");

  await fsExtra.mkdirs("./site/static");
  await fsExtra.mkdirs("./site/static/assets");
  await fsExtra.mkdirs("./site/static/assets/images");
}

function compileWithWebpackAsync(config) {
  console.log("Compiling: ", config.entry);
  return new Promise((resolve, reject) => {
    const cfg = Object.assign({}, config); // clone
    cfg.mode = getBuildMode();

    const compiler = webpack(cfg);

    compiler.run((compileError, stats) => {
      if (compileError) {
        reject(compileError);
        return;
      }

      const jsonStats = stats.toJson({
        modules: false,
        chunks: false
      });

      console.info(
        stats.toString({
          chunks: false,
          colors: true
        }) + "\n"
      );

      resolve();
    });
  });
}

async function compileTypeScriptAsync(entry, bundleName) {
  const bundlePath = path.resolve(__dirname, "site/assets/assets/js");

  await compileWithWebpackAsync({
    entry: entry,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      filename: `${bundleName}.js`,
      path: bundlePath
    }
  });

  return path.join(bundlePath, bundleName + ".js");
}

async function compileStyleAsync(entry, bundleName) {
  const bundlePath = path.resolve(__dirname, "site/assets/assets/css");
  const config = {
    entry,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            // fallback to style-loader in development
            isProductionMode() ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader?url=false",
            "sass-loader"
          ]
        }
      ]
    },
    output: {
      path: bundlePath
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${bundleName}.css`
      })
    ]
  };

  if (isProductionMode()) {
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    };
  }

  await compileWithWebpackAsync(config);

  // Delete artifact
  fs.unlinkSync(path.join(bundlePath, bundleName + ".js"));

  return path.join(bundlePath, bundleName + ".css");
}

async function copyStaticFilesAsync() {
  const promiseArray = [copyAsync("./src/static/", "./site/static/")];

  await Promise.all(promiseArray);
}

function getHugoLocalExecutablePath() {
  const exeName = isWin32() ? "hugo.exe" : "hugo";
  const exePath = path.join(__dirname, HUGO_LOCAL_PATH, exeName);

  if (fs.existsSync(exePath)) {
    return exePath;
  }

  return undefined;
}

async function buildHugoAsync() {
  const sourcePath = path.resolve(__dirname, "./site");
  const targetPath = path.resolve(__dirname, "./bin");
  let hugoExecutable = getHugoLocalExecutablePath();
  if (hugoExecutable) {
    console.log(`Building with local Hugo binary: ${hugoExecutable}`);
  } else {
    console.log("Building with global Hugo binary...");
    hugoExecutable = "hugo";
  }

  await spawnAsync(hugoExecutable, [
    "--minify",
    "--source",
    sourcePath,
    "--destination",
    targetPath
  ]);
}

async function buildAsync() {
  console.log(`Build Mode: ${getBuildMode()}`);

  if (isBuildFlagSet("setup")) {
    await downloadHugoAsync();
  }

  if (isBuildFlagSet("clean")) {
    await cleanBuildDirectoriesAsync();
  }

  if (isBuildFlagSet("build-assets") || isBuildFlagSet("build-hugo")) {
    await createBuildDirectoriesAsync();
  }

  if (isBuildFlagSet("build-assets")) {
    const tasks = [
      copyStaticFilesAsync(),
      compileTypeScriptAsync("./src/ts/polyfills.ts", "polyfills"),
      compileTypeScriptAsync("./src/ts/main.tsx", "main"),
      compileStyleAsync("./src/scss/main.scss", "main")
    ];

    await Promise.all(tasks);
  }

  if (isBuildFlagSet("build-hugo")) {
    await buildHugoAsync();
  }
}

console.time("build");

buildAsync()
  .then(() => {
    console.timeEnd("build");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
