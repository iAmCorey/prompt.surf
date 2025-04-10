const inquirer = require("inquirer");
const createTable = require("./createTable");
const addTable = require("./addTable");
const addTableRecord = require("./addTableRecord");
const deleteTable = require("./deleteTable");
const exportTable = require("./exportTable");
const mock = require("./mock.json");
const tableMock = mock?.map((item) => {
  return {
    fields: {
      ID: item.id,
      名称: item.title,
      类型: item.type,
      描述: item.description,
      地址: item.sharing_url,
    },
  };
});

const getInput = async (msg, defaultMsg) => {
  const { input } = await inquirer.prompt([
    {
      type: "input",
      name: "input",
      message: msg,
      default: defaultMsg,
    },
  ]);
  return input;
};

(async function () {
  while (true) {
    const { command } = await inquirer.prompt([
      {
        type: "list",
        name: "command",
        message: "输入命令操作",
        choices: [
          "创建多维表格",
          "添加一张表",
          "添加表记录",
          "删除表记录",
          "导出多维表格",
        ],
      },
    ]);

    // eslint-disable-next-line default-case
    switch (command) {
      case "创建多维表格":
        await (async () => {
          const name = await getInput("多维表格名:");
          const res = await createTable({ name: name });
          if (res) {
            console.log(res);
          }
        })();
        break;
      case "添加一张表":
        await (async () => {
          const app_token = await getInput("appToken:");
          const name = await getInput("表名:");
          const res = await addTable(app_token, {
            name: name,
            default_view_name: name,
            fields: [
              { field_name: "ID", type: 1 },
              { field_name: "名称", type: 1 },
              { field_name: "类型", type: 1 },
              { field_name: "描述", type: 1 },
              { field_name: "地址", type: 1 },
            ],
          });
          if (res) {
            console.log(res);
          }
        })();
        break;
      case "添加表记录":
        await (async () => {
          const app_token = await getInput("appToken:");
          const table_id = await getInput("table_id:");
          const res = await addTableRecord(app_token, table_id, tableMock);
          if (res) {
            console.log(res);
          }
        })();
        break;
      case "删除表记录":
        await (async () => {
          const app_token = await getInput("appToken:");
          const table_id = await getInput("table_id:");
          const record = await getInput("输入record_id:");
          const info = await deleteTable(app_token, table_id, [record]);
          if (info) {
            console.log(info);
          }
        })();
        break;
      case "导出多维表格":
        await (async () => {
          const app_token = await getInput("appToken:");
          const table_id = await getInput("table_id:");
          const res = await exportTable(app_token, table_id);
          if (res) {
            console.log(res);
          }
        })();
        break;
    }
  }
})();
