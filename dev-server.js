const connect = require("connect");
const serveStatic = require("serve-static");

const app = connect();
app.use((req, res, next) => {
    console.log(req.url);
    if (/\.wasm$/i.test(req.url)) {
        res.setHeader("Content-Type", "application/wasm");
    }
    next();
});
app.use(serveStatic("./bin"));
app.listen(5000, () => {
    console.log("HTTP server started.");
});
