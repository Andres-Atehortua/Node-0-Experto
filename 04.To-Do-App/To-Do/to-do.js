const fs = require("fs");
require("colors");

let toDoList = [];
const saveDB = () => {
  let data = JSON.stringify(toDoList);

  fs.writeFile("./DB/data.json", data, (err) => {
    if (err) throw new Error("Error", err);
  });
  console.log("Saving task...");
};

const loadDB = () => {
  try {
    toDoList = require("./../DB/data.json");
  } catch (error) {
    toDoList = [];
  }
};

const create = (description) => {
  loadDB();
  description = description.toUpperCase();
  let toDo = {
    description,
    completed: false,
  };
  toDoList.push(toDo);
  saveDB();
  return toDo;
};

const getList = () => {
  loadDB();
  return toDoList;
};

const updateTask = (description, completed = true) => {
  loadDB();
  description = description.toUpperCase();
  let index = toDoList.findIndex((task) => task.description === description);
  if (index >= 0) {
    completed === "true" && (completed = true);
    completed === "false" && (completed = false);
    toDoList[index].completed = completed;
    saveDB();
    return true;
  } else {
    console.log("Task did not found");
    return false;
  }
};

const deleteTask = (description) => {
  loadDB();
  description = description.toUpperCase();

  let index = toDoList.findIndex((task) => task.description === description);
  if (index >= 0) {
    toDoList.splice(index, 1);
    saveDB();
    return true;
  } else {
    console.log("Task did not found");
    return false;
  }
};
module.exports = {
  create,
  getList,
  updateTask,
  deleteTask,
};
