import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function AddPost() {
  const [title,setTitle]=useState();
  const [userEmail,SetUserEmail]=useState()
  const [descriptions,setDescriptions]=useState();
  const [isLogIn,setLogIn]=useState(false)
  const navigate=useNavigate();
  //To find user data using useEffect
  useEffect(()=>{
    if(localStorage.getItem("blogToken")){
    const localStorageData=localStorage.getItem("blogToken");
    const storedToken=JSON.parse(localStorageData);
    //console.log(storedToken);
    setLogIn(true);
    SetUserEmail(storedToken.email);
    }},[])
  const handleSubmisson= (e)=>{
   const formData={
      email:userEmail,
      title:title,
      descriptions:descriptions
    }
console.log(formData)
    axios.post("http://localhost:8001/addtodo",formData,{
    })
    .then((result)=>{
      console.log(result.data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: result.data.Result,
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    })
    .catch(()=>{
      Swal.fire({ position: 'top-end',
      icon: 'error',
      title: 'Your Blog is not saved',
      showConfirmButton: false,
      timer: 1500
      
    })
    navigate('/login')
  })
    navigate('/')
  }
  return (
    <div className='form-container'>
     {!isLogIn && <p style={{color:"red"}}>Log in required</p> }
  <form onSubmit={()=>handleSubmisson()} method="POST">
    <h2>Add Todo</h2>
    <input type="text" name="title" placeholder='Write title' onChange={(e)=>setTitle(e.target.value)} required></input><br/>
    <textarea type="text" name="descriptions" placeholder='Write description here' style={{height:'100px'}} onChange={(e)=> setDescriptions(e.target.value) } required></textarea><br/>
    <button className='newblog-btn' type='submit' >Submit</button>
  </form>
    </div>
  )
}
