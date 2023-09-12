import express from 'express';
const todosRouter = express.Router();
import { getAllTodos, createTodo, deleteTodo, changeTodo } from '../controllers/todosController.js';

todosRouter.get('/', getAllTodos);
todosRouter.post('/', createTodo);
todosRouter.delete('/:id', deleteTodo);
todosRouter.put('/', changeTodo);

export default todosRouter;