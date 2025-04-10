const ora = require("ora");
const chalk = require("chalk");

const spinner = (text = "执行中") => {
  const instance = ora(text).start();
  return {
    succeed: (text = "执行成功") => {
      instance.text = chalk.greenBright(text);
      instance.succeed();
    },
    fail: (text = "执行失败") => {
      instance.text = chalk.redBright(text);
      instance.fail();
    },
  };
};

module.exports = spinner;
