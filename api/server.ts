import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/authRouter.ts";
import genTodosRouter from "./routes/genTodosRouter.ts";
import 'dotenv/config';

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter)
app.use('/', genTodosRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
