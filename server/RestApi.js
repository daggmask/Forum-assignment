const sqlite3 = require("better-sqlite3");
const Encrypt = require("./Encrypt");

module.exports = class RestApi {
  constructor(expressApp, urlPrefix = "/api/", pathToDb = "./server/forum.db") {
    this.app = expressApp;
    this.db = sqlite3(pathToDb);
    this.prefix = urlPrefix;

    let tables = this.getAllTables();
    for (let table of tables) {
      if(table !== "usersXsubjects"){       
        this.createGetAllRoute(table);
        if(table !== "comments"){
          this.createGetRoute(table);
        }
        else{
          this.getCommentsForPost(table)
        }
        this.createPostRoute(table);
        this.createPutRoute(table);
        this.createDeleteRoute(table);
      }
      else{
        this.getUserModeratorSubjects(table);
      }
      }
      this.addLoginRoutes();
  }

  getAllTables() {
    let statement = this.db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = $type
  `);
    return statement.all({ type: "table" }).map((x) => x.name);
  }

  createGetAllRoute(table) {
    this.app.get(this.prefix + table, (req, res) => {
      let statement = this.db.prepare(`
      SELECT * FROM ${table}
    `);
      res.json(statement.all().map((x) => ({ ...x, password: undefined })));
    });
  }

  createGetRoute(table) {
    this.app.get(this.prefix + table + "/:id", (req, res) => {
      console.log(table);
      let statement = this.db.prepare(`
      SELECT * FROM ${table}
      WHERE id = $id
    `);
      let result = statement.get(req.params) || null;
      if (result) {
        delete result.password;
      }
      res.json(result);
    });
  }

  createPostRoute(table) {
    this.app.post(this.prefix + table, (req, res) => {
      let b = req.body;
      if (b.password) {
        b.password = Encrypt.multiEncrypt(b.password);
      }
      let statement = this.db.prepare(`
      INSERT INTO ${table} (${Object.keys(b)})
      VALUES (${Object.keys(b).map((x) => "$" + x)})
    `);
      // Run the statement
      res.json(statement.run(b));
    });
  }

  createPutRoute(table) {
    this.app.put(this.prefix + table + "/:id", (req, res) => {
      let b = req.body;
      // If the request body has a key password
      // then encrypt the password
      if (b.password) {
        b.password = Encrypt.multiEncrypt(b.password);
      }
      // Add the id to b
      b.id = req.params.id;
      // Build the statement according to the keys
      // in the request body
      let statement = this.db.prepare(`
      UPDATE ${table} 
      SET ${Object.keys(b).map((x) => x + " = $" + x)}
      WHERE id = $id
    `);
      // Run the statement
      res.json(statement.run(b));
    });
  }

  createDeleteRoute(table) {
    this.app.delete(this.prefix + table + "/:id", (req, res) => {
      let statement = this.db.prepare(`
      DELETE FROM ${table} WHERE id = $id
    `);
      res.json(statement.run(req.params));
    });
  }

  getUserModeratorSubjects(table) {

    this.app.get(this.prefix + table + "/:id", (req, res) => {
      console.log(table);
      let statement = this.db.prepare(`
      SELECT * FROM ${table}
      WHERE userId = $id
    `);
      let result = statement.get(req.params) || null;
      res.json(result);
    });
  }

  //Add routes for login, check if logged in
  //and logout - /note: not pure rest-routes
  addLoginRoutes() {
    this.app.post(this.prefix + "login", (req, res) => {
      if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      console.log(req.body);

      let statements = this.db.prepare(`
        SELECT * FROM users
        WHERE email = $email
        AND password = $password
      `);
      let user = statements.get(req.body) || null;

      if (user) {
        delete user.password;
        req.session.user = user;
      }

      res.json(user);
    });

    this.app.get(this.prefix + "login", (req, res) => {
      res.json(req.session.user || null);
    });

    this.app.delete(this.prefix + "login", (req, res) => {
      delete req.session.user;
      res.json({ loggedOut: true });
    });
  }

  getCommentsForPost(table){
    this.app.get(this.prefix + table + "/:postId", (req, res) => {
      let statement = this.db.prepare(`
      SELECT * FROM ${table}
      WHERE post = $postId
    `);
      let result = statement.all(req.params) || [];
      console.log(result);
      res.json(result);
    });
  }
};


