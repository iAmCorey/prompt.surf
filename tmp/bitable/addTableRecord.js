const client = require("./client");
const spinner = require("./spinner");

const addTableRecord = async (app_token, table_id, records) => {
  const execSpinner = spinner("添加中");
  try {
    const { data } = await client.bitable.appTableRecord.batchCreate({
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      data: {
        records: records,
      },
    });
    execSpinner.succeed("添加成功");
    return data;
  } catch (e) {
    execSpinner.fail("添加失败");
  }
};
module.exports = addTableRecord;
