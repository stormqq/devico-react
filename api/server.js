const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/todos/bulk', require('./routes/bulkRouter.js'))
app.use('/todos', require('./routes/todosRouter'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
