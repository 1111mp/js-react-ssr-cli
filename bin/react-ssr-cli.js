#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const { version } = require("../package.json");

program
  .version(version, "-v -V --version")
  .description("output the current version");

program
  .command("create <app-name>")
  .option("-d --dir <dir>", "Project directory")
  .description("create project")
  .action((appName) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "desc",
          message: "description:",
          default: "",
        },
        {
          type: "input",
          name: "author",
          message: "author:",
          default: "",
        },
        {
          type: "list",
          message: "Use js or ts:",
          name: "es",
          choices: ["js", "ts"],
          filter: function (val) {
            return val.toLowerCase();
          },
        },
        {
          type: "list",
          message: "Choose your Store manager:",
          name: "store",
          choices: ["MobX", "Redux"],
          filter: function (val) {
            // 使用filter将回答变为小写
            return val.toLowerCase();
          },
        },
        {
          type: "confirm",
          name: "isYarn",
          message: "Use yarn to install modules?",
          default: false,
        },
      ])
      .then((answers) => {
        // console.log(answers);
        const create = require("../create");
        create({
          ...answers,
          appName,
        });
      });
  });

program.parse(process.argv);
