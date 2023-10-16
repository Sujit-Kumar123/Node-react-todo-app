import { Route, Routes } from "react-router-dom";
import AddPost from "./AddPost";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from "./Detail";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Update from "./UpdatePost";
import UserRegistration from "./UserRegistration";
import UserSignIn from "./UserSignIn";
import MyAccount from "./Componet/MyAccount";
import "@fontsource/poppins";
import Footer from "./Footer";
//import Home from "./Home";


function App() {
  
  return (
    <div className="App" style={{backgroundImage:`url(${process.env.PUBLIC_URL + "/backGround.png"})`,height:"100hv",width:"100%"}}>

      <Navbar />
      <Routes>
        <Route path="/" element={<Pagination />} />
        <Route path="addPost" element={<AddPost />} />
        <Route path="read/:_id" element={<Detail />}></Route>
        <Route path="update/:_id" element={<Update />} />
        <Route path="registration" element={<UserRegistration />} />
        <Route path="login" element={<UserSignIn />} />
        <Route path='myAccount'element={<MyAccount/>} />
        {/*<Route path="home" element={<Home />} /> */}
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
