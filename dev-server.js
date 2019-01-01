const path = require("path");
const fs = require("fs");
const connect = require("connect");
const compression = require("compression");
const serveStatic = require("serve-static");

const serverPort = 5000;
const wwwRoot = path.join(__dirname, "bin");

const app = connect();

app.use((req, res, next) => {
  console.log(req.url);

  // Set WebAssembly modules content type.
  if (/\.wasm$/i.test(req.url)) {
    res.setHeader("Content-Type", "application/wasm");
  }

  next();
});

app.use(compression());
app.use(serveStatic(wwwRoot));
app.listen(serverPort, () => {
  console.log(`HTTP server started at port ${serverPort}.`);
});
