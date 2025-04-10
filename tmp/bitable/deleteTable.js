const client = require("./client");
const spinner = require("./spinner");

const deleteTable = async (app_token, table_id, records) => {
  const execSpinner = spinner("删除中");
  try {
    const { data } = await client.bitable.appTableRecord.batchDelete({
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      data: {
        records: records,
      },
    });
    execSpinner.succeed("删除成功");
    return data;
  } catch (e) {
    execSpinner.fail("删除失败");
  }
};
module.exports = deleteTable;
