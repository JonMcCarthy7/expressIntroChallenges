var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/yourroute", function(req, res) {
  res.send("stuff");
});

app.post("/create/:name/:age", (req, res) => {
  let user = {
    name: req.params.name,
    age: req.params.age
  };
  let filePath = __dirname + "/storage.json";
  // Read file content && Convert into a js array (JSON.parse)
  let fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
  fileContent.push(user);
  fs.writeFileSync(filePath, JSON.stringify(fileContent));
  res.send(fileContent);
});

app.get("/", (req, res) => {
  res.send(fs.readFileSync(__dirname + "/storage.json", "utf8"));
});

app.get("/:name", (req, res) => {
  let filePath = __dirname + "/storage.json";
  let fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let name = fileContent.find(el => el.name === req.params.name);
  name ? res.send(name) : res.sendStatus(400);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log("Listening on port", port);
});
