const express = require('express');
const { 
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController')

const router = express.Router();

// GET all tasks
router.get('/', getTasks);

// GET a single task
router.get('/:id', getTask);

// POST a new task
router.post('/', createTask);

// UPDATE a task
router.patch('/:id', updateTask);

// DELETE a task
router.delete('/:id', deleteTask);


module.exports = router;