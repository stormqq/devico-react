const express = require('express');
const bulkRouter = express.Router();
const { selectAllTodos, deleteAllCompletedTodos } = require('../controllers/bulkController');

bulkRouter.put('/', selectAllTodos);
bulkRouter.delete('/', deleteAllCompletedTodos);

module.exports = bulkRouter;