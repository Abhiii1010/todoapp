const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get todos with pagination
exports.getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const [todos, count] = await Promise.all([
      Todo.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Todo.countDocuments()
    ]);

    return res.json({
      todos,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Get a single todo by id
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    return res.json(todo);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    return res.json(todo);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    return res.json({ message: 'Todo deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
};
