const client = require("./client");
const spinner = require("./spinner");

const createTable = async (body) => {
  const execSpinner = spinner("创建中");
  try {
    const { data } = await client.bitable.app.create({
      data: body,
    });

    execSpinner.succeed("创建成功");
    return data;
  } catch (e) {
    execSpinner.fail("创建失败");
  }
};
module.exports = createTable;
