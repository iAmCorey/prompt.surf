const client = require("./client");
const spinner = require("./spinner");

const addTable = async (app_token, table) => {
  const execSpinner = spinner("创建中");
  try {
    const { data } = await client.bitable.appTable.create({
      path: {
        app_token: app_token,
      },
      data: {
        table: table,
      },
    });
    execSpinner.succeed("创建成功");
    return data;
  } catch (e) {
    execSpinner.fail("创建失败");
  }
};
module.exports = addTable;
