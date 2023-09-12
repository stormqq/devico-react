import express from 'express';
const bulkRouter = express.Router();
import { selectAllTodos, deleteAllCompletedTodos } from '../controllers/bulkController.js';

bulkRouter.put('/', selectAllTodos);
bulkRouter.delete('/', deleteAllCompletedTodos);

export default bulkRouter;