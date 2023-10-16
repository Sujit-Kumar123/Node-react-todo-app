const mongoose=require("mongoose");
require('dotenv').config();
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gnrh4jm.mongodb.net/todo_app?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // socketTimeoutMS: 30000,
    keepAlive: true,
    // reconnectTries: 30000
}
const connectDB = async () => {
    try{
        mongoose.connect(uri,connectionParams)
        console.log("Connected to cloud db")
    }catch(error){
        console.log("Error",error)
    }

}
module.exports=connectDB
