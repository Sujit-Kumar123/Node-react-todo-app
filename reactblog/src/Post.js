import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Post({ blog }) {
  const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate(`/read/${blog._id}`)
  }
  // console.log("first",blog._id)
  return (
    <Link to={`/read/${blog._id}`} className="post-link">
      <div className="blog">
        <div className="blog-title">
        
          <h2>{blog.title}</h2>
          <p>{blog.desctiption}</p>
          <button onClick={handleNavigate} >VIEW MORE</button>
          <br></br>
        </div>
      </div>
    </Link>
  );
}
export default Post;
