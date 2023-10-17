import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Swal from "sweetalert2";

const Account = ({ show, picture, name, email }) => {
  const navigate = useNavigate();
  const logOut = () => {
    if (localStorage.getItem("blogToken")) {
      const localStorageData = localStorage.getItem("blogToken");
      const storedToken = JSON.parse(localStorageData);
      const token = storedToken.token;
      console.log(token)
      const config = {
          authorization: token,
          accept: "application/json", 
      };
      console.log("first",config)
      axios
        .post("http://localhost:8001/logout",config)
        .then((res) => {
          //console.log(res);
          localStorage.removeItem("blogToken");
          navigate("/login");
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
          //console.log(error);
          alert("logout deny");
        });
    }
  };
  const submit = () => {
    confirmAlert({
      title: "Confirm to Logout",
      message: "Are you sure to logout.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            logOut();
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };
  return (
    <>
      {show && (
        <div className="flex flex-col dropDownField">
          <div className=" userProfileIcon">
            <Link className="profileIcon" to="myAccount">
              {picture.length !== 0 && (
                  picture.map((pic,i)=>(
                  <img
                    key={i}
                    src={
                      process.env.REACT_APP_API_KEY_GET_IMAGE +
                      pic.profile_image
                    }
                    alt="alt"
                  ></img>
                  ))
              )}
              {picture.length === 0 && (
                <img
                  src={process.env.PUBLIC_URL + "./image/VectorDefaultUser.png"}
                  alt=""
                ></img>
              )}
              <img
                className="camera"
                src={process.env.PUBLIC_URL + "./image/VectorCam.png"}
                alt=""
              ></img>
            </Link>
            <h5>{name}</h5>
            <h6>{email}</h6>
            <p>Manage your Account</p>
          </div>
          <div className="profileBlock">
            <p>
              <img
                className="humanIcon"
                src={
                  process.env.PUBLIC_URL +
                  "./image/the-human-icon-and-logo-vector.jpg"
                }
                alt=""
              ></img>
              <Link to="myAccount">My Account</Link>
            </p>
            <hr></hr>
            <p>
              <img
                src={process.env.PUBLIC_URL + "./image/VectorLogOut.png"}
                alt=""
              ></img>
              <Link onClick={submit}>Log out</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
