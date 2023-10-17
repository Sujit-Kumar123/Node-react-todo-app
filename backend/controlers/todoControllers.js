const User = require('../models/userModel');
const Todo=require('../models/todoList');
const UserToken=require('../models/userTokenModel')
// Create a new todo
const createTodo = async (req, res) => {
    try {
      const { token } = req.query;
      // console.log("OK",token)
      if (!token) return res.status(404).send("Login is required");
      // console.log("first",req.body.title,req.body.description)
      if (!req.body.title) return res.status(404).send("Title is required");
      if (!req.body.description) return res.status(404).send("Description required")
      const user=await UserToken.findOne({token:token})
      // console.log("fi",user.userId)
      const newTodo = new Todo({
        title:req.body.title,
        desctiption:req.body.description,
        userId:user.userId
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
      const { page, limit, token } = req.query;
      // console.log("first",page,limit,token) 
      if (!token) return res.status(404).send("Login is required")
      const currentPage = parseInt(page) || 1;
      const perPage = parseInt(limit) || 10;
      const user=await UserToken.findOne({token:token})
      // console.log("Email",user)
      if(!user) return res.status(404),send("Not validate user")
      // Calculate the skip value to implement pagination
      const skip = (currentPage - 1) * perPage;
  
      const todos = await Todo.find({userId:user.userId})
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
  const {_id}=req.query;
  if(!_id)return res.status(400).json({ error: 'Invalid _id provided' });
  // console.log("first",_id);
  const todo = await Todo.findById(_id);
  res.status(200).json(todo);
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch todos' });
}
}   
// Update a todo by its _id
const updateTodo = async (req, res) => {
  try {
    const { _id } = req.query; // Assuming you pass the _id as a route parameter
    const { title, description } = req.body; // Data to update
    // console.log("first",_id)
    // Check if _id is valid
    if (!_id) {
      return res.status(400).json({ error: 'Invalid todo provided' });
    }
// console.log("first","DFGHJKKKKKKKKKKJ")
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
      todo.desctiption = description;
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
    const { _id } = req.query; // Assuming you pass the _id as a query parameter
    console.log("Received _id:", _id);

    // Check if _id is valid
    if (!_id) {
      return res.status(400).json({ error: 'Invalid Todo _id provided' });
    }

    // Find and remove the todo by _id
    const removedTodo = await Todo.findByIdAndRemove(_id);

    // Check if the todo was found and removed
    if (!removedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
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