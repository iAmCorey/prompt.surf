const client = require("./client");
const spinner = require("./spinner");

const exportTable = async (app_token, table_id) => {
  const execSpinner = spinner("导出中");
  try {
    const res = await client.bitable.appTableRecord.list({
      params: {
        page_size: 500,
      },
      path: {
        app_token: app_token,
        table_id: table_id,
      },
    });
    execSpinner.succeed("导出成功");
    return res;
  } catch (e) {
    execSpinner.fail("导出失败");
  }
};
module.exports = exportTable;
