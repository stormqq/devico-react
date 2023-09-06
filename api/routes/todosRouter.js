const express = require('express');
const todosRouter = express.Router();
const { getAllTodos, createTodo, deleteTodo, changeTodo } = require('../controllers/todosController');

todosRouter.get('/', getAllTodos);
todosRouter.post('/', createTodo);
todosRouter.delete('/:id', deleteTodo);
todosRouter.put('/', changeTodo);

module.exports = todosRouter;