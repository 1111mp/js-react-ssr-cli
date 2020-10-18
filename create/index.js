const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const fs = require("fs-extra");
const install = require("./utils/install");

module.exports = async function create(opts = {}) {
  const { appName, es, isYarn, store } = opts;
  const spinner = ora("creating... \n").start();
  const projectDir = path.join(process.cwd(), appName);
  const tempSrc = path.resolve(__dirname, `../template/${es}`);

  try {
    const { temp, dir, name: fileName } = require(path.resolve(
      __dirname,
      `../generator/${es}/files/package.js`
    ))(opts);

    fs.mkdirpSync(path.join(projectDir, dir));
    fs.writeFileSync(path.join(projectDir, dir, fileName), temp.trim());
  } catch (error) {
    console.error(error);
    spinner.fail(`Create ${appName} failed at package.json`);
    return;
  }

  try {
    fs.copySync(tempSrc, projectDir);

    if (store === "mobx") {
      // mobx
      const mobxSrc = path.resolve(__dirname, `../generator/${es}/mobx`);
      fs.copySync(mobxSrc, projectDir);
    } else {
      // redux
      const reduxSrc = path.resolve(__dirname, `../generator/${es}/redux`);
      fs.copySync(reduxSrc, projectDir);
    }

    spinner.succeed(`Create ${appName} successfully`);
  } catch (error) {
    console.error(error);
    spinner.fail(`Create ${appName} failed`);
    return;
  }

  spinner.info("installing modules...");

  install({ cwd: projectDir, isYarn })
    .then(() => {
      spinner.succeed("install succeeded!");
      console.log(
        chalk.greenBright(
          `Project created successfully. Now you can cd ${appName} && ${
            isYarn ? "yarn dev" : "npm run dev"
          }`
        )
      );
    })
    .catch((err) => {
      spinner.fail("install modules failed!");
    });
};
