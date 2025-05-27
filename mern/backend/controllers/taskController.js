const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id;
    const tasks = await Task.find({user_id}).sort({createdAt: 1});

    res.status(200).json(tasks);
}

// Get a single task
const getTask = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task);
}

// Create a new task
const createTask = async (req, res) => {
    const {title, description, status, priority, duedate} = req.body;

    const requiredFields = ['title', 'description', 'status'];
    let emptyFields = requiredFields.filter(field => !req.body[field]);

    if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    // add doc to db
    try {
        const user_id = req.user._id;
        const task = await Task.create({title, description, status, user_id, priority, duedate});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)

}

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)

}


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}