import express from "express";
import fs from "fs";
import path from "path";
import setupDevServer from "./setup-dev-server";
import ServerRenderer from "./renderer";

const app: express.Application = express();

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

let renderer: any, readyPromise: any;
let template = fs.readFileSync("index.html", "utf-8");

if (isProd) {
  // 静态资源映射到dist路径下
  app.use("/dist", express.static(path.join(__dirname, "../dist")));

  let bundle = require("../dist/server-bundle.json");
  let stats = require("../dist/loadable-stats.json");
  renderer = new ServerRenderer(bundle, template, stats);
} else {
  readyPromise = setupDevServer(app, (bundle: any, stats: any) => {
    renderer = new ServerRenderer(bundle, template, stats);
  });
}

app.use("/public", express.static(path.join(__dirname, "../public")));

// app.use(express.static(path.resolve(__dirname, "../dist")));

const render = (req: any, res: any) => {
  // 此对象会合并然后传给服务端路由，不需要可不传
  const context = {};

  renderer
    .renderToString(req, context)
    .then(({ error, html }: { error: any; html: any }) => {
      if (error) {
        if (error.url) {
          res.redirect(error.url);
        } else if (error.code) {
          res.status(error.code).send("error code：" + error.code);
        }
      }
      res.send(html);
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
};

app.get("/api", (req: any, res: any) => {
  res.json([
    { id: 1, title: "我是1111111111" },
    { id: 2, title: "我是222222222222" },
  ]);
});

app.get(
  "*",
  isProd
    ? render
    : (req: any, res: any) => {
        readyPromise.then(() => render(req, res));
      }
);

app.listen(port, function () {
  console.log(`App is running at http://localhost:${port}`);
});
