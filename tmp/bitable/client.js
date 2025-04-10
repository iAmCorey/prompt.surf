const lark = require("@larksuiteoapi/node-sdk");

const client = new lark.Client({
  appId: "cli_a77d8dd1e97ad00e",
  appSecret: "WLWESemnMZJpxA1sQHxVKdnQYZWJpm2O",
  appType: lark.AppType.SelfBuild,
  domain: lark.Domain.Feishu,
});

module.exports = client;
