// Requireds
require("colors");
const argv = require("./config/yargs.config").argv;
const { create, getList, updateTask, deleteTask } = require("./To-Do");
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
    let updatedTask = updateTask(argv.description, argv.completed);
    console.log(
      updatedTask
        ? `Updated: ${updatedTask}`.green
        : `Updated: ${updatedTask}`.red
    );
    break;
  case "delete":
    let deletedTask = deleteTask(argv.description);
    console.log(
      deletedTask
        ? `Deleted: ${deletedTask}`.green
        : `Deleted: ${deletedTask}`.red
    );
    break;

  default:
    console.log(`Unknown Command: ${comando}`);
    break;
}
