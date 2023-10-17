import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import CommentOnPost from "./CommentOnPost";
import Button from 'react-bootstrap/Button';


export default function Detail() {
  const { _id } = useParams();
  console.log('first',_id)
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  // const [localUserId, setLocalUserId] = useState();
  const [owner, setOwner]=useState()
  // const getUserId = () => {
  //   if (localStorage.getItem("blogToken")) {
  //     const localStorageData = localStorage.getItem("blogToken");
  //     const storedToken = JSON.parse(localStorageData);
  //     //console.log(storedToken);
  //     const token = storedToken.token;
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     axios
  //       .get(process.env.REACT_APP_API_KEY_URL+"get-user", config)
  //       .then((response) => {
  //         setLocalUserId(response.data.user.id);
  //       })
  //         .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  useEffect(() => {
    // getUserId();
    axios
      .get(`http://localhost:8001/gettodo_by_id?_id=${_id}`)
      .then((res) => {
        console.log("data",res.data)
        setPost(res.data)
                      setOwner(res.data[0].user_id)})
      .catch((err) => console.log(err));
  }, [_id]);

  const deletePost = async (_id) => {
      try {
        await axios.delete(`http://localhost:8001/delete_todo_by_id/?_id=${_id}`);
        //console.log(res.data)
        navigate('/');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Blog has been deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }catch (error) {
        navigate(`/update/${_id}`);
        console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your have not authorize to delete",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }; 
  return (
    <div className="detail-post-container">
        <div key={post._id} className="title-description">
          <h2>{post.title}</h2>
{/* 
          <img
            className="detail-image"
            src={process.env.REACT_APP_API_KEY_GET_IMAGE+ po.image}
            alt=""
          /> */}
          <br></br>
          <div className="detail-blog-content">
            <p>{post.desctiption}</p>
          {/* <p>Blog User Id{po.user_id}</p>
            <p>Blog Id{po.id}</p>
            <p>Log in user id {localUserId}</p>*/ } 
          </div>
        </div>
      
      
   {/* {localUserId===owner &&     */}
   <p className="detail-btn-p">
        <Button variant="danger" onClick={() => deletePost(_id)}>Completed</Button>
        <Button variant="success"><Link to={`/update/${_id}`} >Update</Link></Button>
        </p>
        {/* } */}
    </div>
  );
}
