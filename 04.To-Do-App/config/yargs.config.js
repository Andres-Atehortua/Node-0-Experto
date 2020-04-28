const description = {
  alias: "d",
  demand: true,
  desc: "Description of task",
};
const completed = {
  alias: "c",
  default: true,
  desc: "Mark as completed the task",
};

const argv = require("yargs")
  .command("list", "Show all tasks")
  .command("create", "Create new task", { description })
  .command("update", "Update one task", { description, completed })
  .command("delete", "Delete one task", { description })
  .command("showDone", "Show all done tasks")
  .command("showUndone", "Show all undone tasks")
  .help().argv;

module.exports = { argv };
