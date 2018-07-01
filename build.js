const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");
const fsExtra = require("fs-extra");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const Mustache = require("mustache");
const argv = require("minimist")(process.argv.slice(2));

function isBuildFlagSet(flag) {
    return argv && argv[flag];
}

function getBuildMode() {
    return process.env.NODE_ENV;
}

function isProductionMode() {
    return getBuildMode() === "production";
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

async function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data);
        });
    });
}

async function writeFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

async function getFileListAsync(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, entries) => {
            if (err) {
                reject(err);
                return;
            }

            const files = entries.filter(name => {
                const filePath = path.join(directoryPath, name);
                const stat = fs.statSync(filePath);
                return stat.isFile();
            });

            resolve(files);
        });
    });
}

async function renderTemplateAsync(templatePath, outputPath, view) {
    const template = await readFileAsync(templatePath);
    const output = Mustache.render(template.toString(), view);
    await writeFileAsync(outputPath, output);
}

async function cleanBuildDirectoryAsync() {
    console.log("Cleaning build directory...");
    await removeAsync("./bin");
}

async function createBuildDirectoryAsync() {
    console.log("Creating build directory...");
    await fsExtra.mkdirs("./bin");
    await fsExtra.mkdirs("./bin/assets");
    await fsExtra.mkdirs("./bin/assets/css");
    await fsExtra.mkdirs("./bin/assets/js");
    await fsExtra.mkdirs("./bin/assets/images");
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

async function findBundleFilename(bundlePath, bundleName, bundleExtension) {
    const fileArray = await getFileListAsync(bundlePath);
    const pattern = new RegExp(`^${bundleName}\.[0-9a-f]{20}\.${bundleExtension}$`);
    for (const filename of fileArray) {
        if (pattern.test(filename)) {
            return filename;
        }
    }

    return `${bundleName}.${bundleExtension}`;
}

async function compileTypeScriptAsync(entry, bundleName) {
    const bundlePath = path.resolve(__dirname, "bin/assets/js");

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
            filename: `${bundleName}.[hash].js`,
            path: bundlePath
        }
    });

    return await findBundleFilename(bundlePath, bundleName, "js");
}

async function compileStyleAsync(entry, bundleName) {
    const bundlePath = path.resolve(__dirname, "bin/assets/css");
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
                filename: `${bundleName}.[hash].css`
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

    return await findBundleFilename(bundlePath, bundleName, "css");
}

async function copyStaticFilesAsync() {
    const promiseArray = [
        copyAsync("./src/html/index.html", "./bin/index.html"),
        copyAsync("./src/images/", "./bin/assets/images/")
    ];

    await Promise.all(promiseArray);
}

async function buildAsync() {
    if (isBuildFlagSet("clean")) {
        await cleanBuildDirectoryAsync();
    }

    if (isBuildFlagSet("build")) {
        await createBuildDirectoryAsync();
        await copyStaticFilesAsync();
        const mainScriptName = await compileTypeScriptAsync("./src/ts/index.tsx", "main");
        const mainStyleName = await compileStyleAsync("./src/scss/index.scss", "main");
        await renderTemplateAsync("./src/html/index.html", "./bin/index.html", {
            mainScriptUrl: "/assets/js/" + mainScriptName,
            mainStyleUrl: "/assets/css/" + mainStyleName
        });
    }
}

console.time("build");

buildAsync()
    .then(() => {
        console.timeEnd("build");
    })
    .catch(err => {
        console.error(err);
    });
