import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

export default function CommentOnPost({ blog_id, owner }) {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState();
  const [localUserId, setLocalUserId] = useState();
  const [userName, setUserName] = useState();
  //const [idForDelete, setIdForDelete] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const getUserDetails = () => {
    if (localStorage.getItem("blogToken")) {
      const localStorageData = localStorage.getItem("blogToken");
      const storedToken = JSON.parse(localStorageData);
      const token = storedToken.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(process.env.REACT_APP_API_KEY_URL + "get-user", config)
        .then((response) => {
          setLocalUserId(response.data.user.id);
          setUserName(response.data.user.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getUserDetails();
    axios
      .get(process.env.REACT_APP_API_KEY_URL + "get_comment/" + blog_id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [blog_id]);

  const add_comment = () => {
    if (localStorage.getItem("blogToken")) {
      const jsonData = {
        user_id: localUserId,
        blog_id: blog_id,
        name: userName,
        message: userComment,
      };
      axios
        .post(
          process.env.REACT_APP_API_KEY_URL + "add_comment/" + blog_id,
          jsonData
        )
        .then((res) => {
          //console.log(res.data.message);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Log in required",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //Delete all comment by Owner
  const deleteAllComment = () => {
    //console.log(isCheck);
    //console.log(comments)
    if (isCheck.length !== 0) {
      const jsonData = {
        arr: isCheck,
      };
      axios
        .delete(process.env.REACT_APP_API_KEY_URL + "delete_Selected_comment", {
          data: JSON.stringify(jsonData),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          //console.log(res.data.Result);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.Result,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1500);
        })

        .catch((error) => {
          console.log(error);
        });
    }
    else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No item is checked !",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleCommentId = (e) => {
    const { name, checked } = e.target;
    setIsCheck([...isCheck, Number(name)]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== Number(name)));
    }
  };
    
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(comments.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
    //console.log(isCheckAll)
  };
  return (
    <div className="commentOnPost">
      <p className="commentHead">
        Comments{" "}
        {comments.length !== 0 && localUserId === owner && (
          <>
            {/**/}
            <Button variant="danger" onClick={deleteAllComment}>
              Delete All
            </Button>
          </>
        )}
      </p>
      {comments.map((comm, i) => (
        <Comments
          com={comm}
          key={i}
          user_id={localUserId}
          owner={owner}
          onClick={handleCommentId}
          isChecked={isCheck.includes(comm.id)}
        />
      ))}

      <div className="commentArea">
        <p>
          Drop Your comment 
        {comments.length !== 0 && localUserId === owner &&   <span className="selectAll">
            <input type="checkbox" onChange={handleSelectAll} checked={isCheckAll}></input>Check all
          </span>}
        </p>
        <textarea
          placeholder="comment"
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>
        <button className="postComment" onClick={add_comment}>
          Post comment
        </button>
      </div>
    </div>
  );
}
