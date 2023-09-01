const http = require("http");
const bodyParser = require("body-parser");
const url = require("url");

let todos = [];

const hostname = "127.0.0.1";
const port = 3000;

const jsonParser = bodyParser.json();

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Max-Age": 2592000,
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.url === "/todos") {
    switch (req.method) {
      case "GET":
        res.writeHead(200, headers);
        res.end(JSON.stringify(todos));
        break;
      case "POST":
        jsonParser(req, res, () => {
          const { text } = req.body;
          console.log("post testing");
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

            if (text === "error") {
              res.writeHead(400, headers);
              res.end(JSON.stringify({ message: "Some text for error" }));
              return;
            }

            res.writeHead(201, headers);
            res.end(JSON.stringify(todos));
          } else {
            res.writeHead(400, headers);
            res.end(JSON.stringify({ message: "Invalid length" }));
          }
        });
        break;
      case "PUT":
        jsonParser(req, res, () => {
          const { id, text } = req.body;
          const index = todos.findIndex((todo) => todo.id === id);
          if (index === -1) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: "Todo not found" }));
            return;
          }

          if (text === "changingErr") {
            res.writeHead(403, headers);
            res.end(JSON.stringify({ message: "changing errrrrorr" }));
            return;
          }

          if (id && text === undefined)
            todos[index].completed = !todos[index].completed;
          if (text) todos[index].text = text;
          res.writeHead(200, headers);
          res.end(JSON.stringify(todos));
        });
        break;
      default:
        res.writeHead(405, headers);
        res.end("Method not Allowed");
        break;
    }
  }

  if (pathname.startsWith("/todos/")) {
    switch (req.method) {
      case "DELETE":
        const idToDelete = parseInt(pathname.split("/")[2]);
        todos = todos.filter((todo) => todo.id !== idToDelete);
        res.writeHead(200, headers);
        res.end(JSON.stringify(todos));
        break;
      default:
        break;
    }
  }

  if (req.url === "/todos/bulk") {
    switch (req.method) {
      case "DELETE":
        console.log("delete testing");
        todos = todos.filter((todo) => todo.completed === false);
        res.writeHead(200, headers);
        // res.end(JSON.stringify(todos));
        break;
      case "PUT":
        const allTodosCompleted = todos.every((todo) => todo.completed);
        todos = todos.map((todo) => ({
          ...todo,
          completed: !allTodosCompleted,
        }));
        res.writeHead(200, headers);
        res.end(JSON.stringify(todos));
        break;
      default:
        res.writeHead(405, headers);
        res.end("Method Not Allowed");
        break;
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
