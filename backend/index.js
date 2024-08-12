const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');
const auth=require('./controlers/userControllers');
const todo=require('./controlers/todoControllers');
require('dotenv').config();
// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gnrh4jm.mongodb.net/todo_app?retryWrites=true&w=majority`;
const uri = process.env.MONGO_URI || 'mongodb://mongodb:27017/todo_app';
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // keepAlive: true,
}
mongoose.connect(uri,connectionParams)
.then(()=>{
    console.log("DB connected")
}).catch((e)=>{
    console.log("Error",e)
})
    
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
});


const app=express();
app.use(cors());
app.use(express.json()); // Added to parse JSON in the request body

app.post("/register",async(req,res)=>{
    // console.log("User",req.body)
    await auth.userRegister(req,res);
})
app.post("/login",async(req,res)=>{
    await auth.userLogin(req,res);
})
app.post("/logout",async(req,res)=>{
    // console.log("first",req.body)
    await auth.userLogout(req,res)
})
app.post('/addtodo',async(req,res)=>{
    // console.log("first",req.body)
    await todo.createTodo(req,res);
})

app.get('/gettodo',async(req,res)=>{
    console.log(req.body)
    await todo.getAllTodos(req,res);
})
app.get('/gettodo_by_id',async(req,res)=>{
    await todo.getTodosById(req,res);
})
app.delete('/delete_todo_by_id',async(req,res)=>{
    await todo.deleteTodo(req,res);
})
app.put('/update_todo_by_id',async(req,res)=>{
    await todo.updateTodo(req,res);
})

app.listen(8001,()=>{
    console.log("server running at http://localhost:8001");
});
