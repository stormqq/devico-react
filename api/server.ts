import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bulkRouter from "./routes/bulkRouter.js";
import todosRouter from "./routes/todosRouter.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/todos/bulk', bulkRouter)
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
