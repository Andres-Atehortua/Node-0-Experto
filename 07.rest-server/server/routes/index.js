module.exports = (app) => {
  app.use(require("./user.routes"));
  app.use(require("./login.routes"));
  app.use(require("./categories.routes"));
};
