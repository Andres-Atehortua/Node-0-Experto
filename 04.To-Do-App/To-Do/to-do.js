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
const getList = () => {
  loadDB();
  return toDoList;
};

const create = (description) => {
  loadDB();
  let toDo = {
    description,
    completed: false,
  };
  toDoList.push(toDo);
  saveDB();
  return toDo;
};

module.exports = {
  create,
  getList,
};
