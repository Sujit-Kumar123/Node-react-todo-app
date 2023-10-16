const User = require('../models/userModel');
const Todo=require('../models/todoList');
// Create a new todo
const createTodo = async (req, res) => {
    try {
      console.log("OK",req.body.email)
      if (!req.body.email) return res.status(404).send("Login is required");
      if (!req.body.title) return res.status(404).send("Title is required");
      if (!req.body.descriptions) return res.status(404).send("Description required")
      const user=await User.findOne({email:req.body.email})
      console.log("fi",user)
      const newTodo = new Todo({
        title:req.body.title,
        desctiption:req.body.descriptions,
        userId:user._id
    });
      await newTodo.save();
      res.status(201).json({message:'Task is created'});
    } catch (error) {
      res.status(400).json({ error: 'Failed to create todo' });
    }
  };
  
// Get all todos
const getAllTodos = async (req, res) => {
    try {
      const { page, limit, email } = req.query;
      console.log("first",page,limit,email) 
      if (!email) return res.status(404).send("Login is required")
      const currentPage = parseInt(page) || 1;
      const perPage = parseInt(limit) || 10;
      const user=await User.findOne({email:email})
      console.log("Email",user)
      if(!user) return res.status(404),send("Not validate user")
      // Calculate the skip value to implement pagination
      const skip = (currentPage - 1) * perPage;
  
      const todos = await Todo.find({userId:user._id})
        .skip(skip)
        .limit(perPage)
        .populate('userId');   
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  };
//Get Todo by id
const getTodosById=async(req,res)=>{
  try{
  const {_id}=req.params;
  if(!id)return res.status(400).json({ error: 'Invalid _id provided' });
  const todo = await Todo.findById(_id)
  res.status(200).json(todo);
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch todos' });
}
}   
// Update a todo by its _id
const updateTodo = async (req, res) => {
  try {
    const { _id } = req.params; // Assuming you pass the _id as a route parameter
    const { title, description } = req.body; // Data to update

    // Check if _id is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid _id provided' });
    }

    // Find the todo by _id
    const todo = await Todo.findById(_id);

    // Check if the todo exists
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update the todo fields if they are provided in the request
    if (title) {
      todo.title = title;
    }

    if (description) {
      todo.description = description;
    }

    // Update the updatedAt field with the current timestamp
    todo.updatedAt = new Date();

    // Save the updated todo
    await todo.save();

    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
}
// Delete a todo by its _id
const deleteTodo = async (req, res) => {
  try {
    const { _id } = req.params; // Assuming you pass the _id as a route parameter

    // Check if _id is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid _id provided' });
    }

    // Find the todo by _id
    const todo = await Todo.findById(_id);

    // Check if the todo exists
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Delete the todo
    await todo.remove();

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}; 
  module.exports = {
    createTodo,
    getTodosById,
    getAllTodos,
    updateTodo,
    deleteTodo,
  };