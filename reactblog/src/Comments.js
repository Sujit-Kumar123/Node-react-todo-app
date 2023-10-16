import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Comments({ com, user_id, owner, onClick, isChecked }) {
  //console.log(com.id);
  //console.log(user_id);

  var date = new Date(com.updated_at);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var currentYear = new Date().getUTCFullYear();
  const deleteComment = () => {
    console.log(com.id);
    console.log(user_id);
    const jsonData = {
      comment_id: com.id,
      user_id: user_id,
    };
    axios
      .delete(process.env.REACT_APP_API_KEY_URL + "delete_comment", {
        data: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //console.log(res.data);
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
  };
  return (
    <div className="comments">
      <p className="commentUserName">
        {com.name}{" "}
        <span className="dateOfComment">
          {date.getDate()} {months[date.getMonth()]}
          {currentYear !== date.getFullYear() ? date.getFullYear() : ""}
        </span>
        {owner === user_id && (
          <input
            className="checkBox"
            type="checkbox"
            name={com.id}
            onChange={onClick}
            checked={isChecked}
          ></input>
        )}
      </p>
      <hr></hr>
      <p className="blogMessage">{com.message} </p>
      <p className="deleteComment">
        {user_id === com.user_id && <Link onClick={deleteComment}>Delete</Link>}
      </p>
    </div>
  );
}
