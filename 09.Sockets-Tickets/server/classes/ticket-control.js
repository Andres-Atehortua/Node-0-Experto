const fs = require("fs");
class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();
    let { today, lastTicket } = require("./../data/data.json");
    this.today === today ? (this.lastTicket = lastTicket) : this.restartCount();
  }

  restartCount() {
    let jsonData = {
      lastTicket: this.lastTicket,
      today: this.today,
    };
    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
    console.log("Se ha inicializado el sistema.");
  }

  next() {}
}

module.exports = TicketControl;
