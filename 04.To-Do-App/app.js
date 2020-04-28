// Requireds
require("colors");
const argv = require("./config/yargs.config").argv;
const { create, getList } = require("./To-Do");
let comando = argv._[0];

switch (comando) {
  case "create":
    let task = create(argv.description);
    console.log(`New task created:`, task);
    break;
  case "list":
    let list = getList();
    for (let task of list) {
      console.log("=======To-Do=======".blue.bold);
      console.log(task.description.yellow.underline);
      console.log(
        task.completed
          ? `Status ${task.completed}`.green
          : `Status ${task.completed}`.red
      );
      console.log("===================".blue.bold);
    }
    break;
  case "update":
    console.log("Update");
  case "delete":
    console.log("Delete");

  default:
    console.log(`Unknown Command: ${comando}`);
    break;
}
