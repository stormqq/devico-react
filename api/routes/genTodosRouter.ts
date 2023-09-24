import express from 'express';
import { getAllTodos, createTodo, deleteTodo, changeTodo } from '../controllers/todosController.ts';
import { selectAllTodos, deleteAllCompletedTodos } from '../controllers/bulkController.ts';
import { authenticateToken } from '../utils/helpers.ts';

const genTodosRouter = express.Router();

genTodosRouter.use(authenticateToken);

const todosRouter = express.Router();
todosRouter.get('/', getAllTodos);
todosRouter.post('/', createTodo);
todosRouter.delete('/:id', deleteTodo);
todosRouter.put('/', changeTodo);
genTodosRouter.use('/todos', todosRouter);

const bulkRouter = express.Router();
bulkRouter.put('/', selectAllTodos);
bulkRouter.delete('/:uid', deleteAllCompletedTodos);
genTodosRouter.use('/todos/bulk', bulkRouter);

export default genTodosRouter;
