const http = require("http");
const bodyParser = require("body-parser");

let todos = [];

const defaultHeader = { "Content-Type": "application/json" };

const hostname = "127.0.0.1";
const port = 3000;

const jsonParser = bodyParser.json();

const server = http.createServer((req, res) => {
  if (req.url === "/todos") {
    switch (req.method) {
      case "GET":
        res.writeHead(200, defaultHeader);
        res.end(JSON.stringify(todos));
        break;
      case "POST":
        jsonParser(req, res, () => {
          const { text } = req.body;
          if (
            text !== "" &&
            text.trim().length >= 3 &&
            text.trim().length < 20
          ) {
            todos.push({
              id: Date.now(),
              text: text,
              completed: false,
            });
            res.writeHead(200, defaultHeader);
            res.end(JSON.stringify(todos));
          } else {
            res.writeHead(400, defaultHeader);
            res.end(JSON.stringify({ message: "Invalid length" }));
          }
        });
        break;
      case "DELETE":
        jsonParser(req, res, () => {
          const id = req.body.id;
          const index = todos.findIndex((todo) => todo.id === id);
          todos.splice(index, 1);
          res.writeHead(200, defaultHeader);
          res.end(JSON.stringify(todos));
        });
        break;
      case "PUT":
        jsonParser(req, res, () => {
          const { id, text } = req.body;
          if (
            text !== "" &&
            text.trim().length >= 3 &&
            text.trim().length < 20
          ) {
            const index = todos.findIndex((todo) => todo.id === id);
            todos[index].text = text;
            res.writeHead(200, defaultHeader);
            res.end(JSON.stringify(todos));
          } else {
            res.writeHead(400, defaultHeader);
            res.end(JSON.stringify({ message: "Invalid length" }));
          }
        });
        break;
      default:
        break;
    }
  }

  if (req.url === "/todos/bulk") {
    switch (req.method) {
      case "PUT":
        todos.forEach((todo) => todo.completed = true);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
        break;
      case "DELETE":
        todos = todos.filter((todo) => todo.completed === false);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
        break;
      default:
        break;
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
