import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function UserRegistration() {
  const regex = /^[a-z 0-9 A-Z .\- _]+@[a-z]+\.[a-z]{2,3}$/;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conformPassword, setConformPassword] = useState();
  const [emailErrors, setEmailErrors] = useState();
  const [nameErrors, setNameErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [conformPasswordErrors, setConformPasswordErrors] = useState();

  const navigate = useNavigate();
  const checkName = (e) => {
    setName(e.target.value);
    if (!name) {
      setNameErrors("");
    }
  };
  const checkEmail = (e) => {
    setEmail(e.target.value);
    if (regex.test(email) === false) {
      setEmailErrors("Please enter valid email address.");
    } else {
      setEmailErrors("");
    }
  };
  const checkPassword = (e) => {
    setPassword(e.target.value);
    let x = /[0-9]/;
    if (x.test(e.target.value) === false) {
      setPasswordErrors("Password must contain at least one number.");
    } else if (/[a-z]/.test(e.target.value) === false) {
      setPasswordErrors(
        "Password must contain at least one lower case latter."
      );
    } else if (/[A-Z]/.test(e.target.value) === false) {
      setPasswordErrors(
        "Password must contain at least one upper case latter."
      );
    } else if (e.target.value.length < 4) {
      setPasswordErrors("Password length should be gather then 4.");
    } else {
      setPasswordErrors("");
    }
  };
  const checkConformPassword = (e) => {
    setConformPassword(e.target.value);
    if (password !== e.target.value) {
      setConformPasswordErrors("Password miss match.");
    } else {
      setConformPasswordErrors("");
    }
  };
  const userRegistration = (e) => {
    e.preventDefault();

    if (validateData(name, email, password, conformPassword)) {
      const jsonData = {
        name: name, 
        email: email,
        password: password,
      };
      console.log("first",jsonData)
      axios
        .post("http://localhost:8001/register", jsonData)
        .then((response) => {
          console.log(response.data);
          navigate("/login");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error);
          navigate("/registration");
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Your registration deny",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  function validateData(name, email, password, conformPassword) {
    if (!name) {
      setNameErrors("Name field should not empty.");
      return false;
    } else if (!email) {
      setEmailErrors("Email field should not empty.");
      return false;
    } else if (regex.test(email) === false) {
      setEmailErrors("This is not a valid Email.");
      return false;
    } else if (!password) {
      setPasswordErrors("Password field should not empty.");
      return false;
    } else if (password.length < 4) {
      setPasswordErrors("Password length should be gather then 4.");
      return false;
    } else if (password.length >= 16) {
      setPasswordErrors("Password length should be less then 16.");
      return false;
    } else if (!conformPassword) {
      setConformPasswordErrors("Conform Password field should not empty.");
      return false;
    } else if (password !== conformPassword) {
      setConformPasswordErrors("Conform Password field should not matched.");
      return false;
    } else {
      return true;
    }
  }
  //console.log(name, email, password);
  return (
    <div className="regContainer row">
      <div className="col-6">
        <div
          className="registrationBackground"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "./image/RegistrationBack.png"
            })`,
          }}
        >
          <div className="registrationLogoHome">
            <Link to="/">
              <p>
                <img
                  src={process.env.PUBLIC_URL + "./Rectangle 6home.png"}
                  alt=""
                ></img>
                <img
                  src={process.env.PUBLIC_URL + "./Rectangle 6home.png"}
                  alt=""
                ></img>
                <img
                  src={process.env.PUBLIC_URL + "./Rectangle 6home.png"}
                  alt=""
                ></img>
                <img
                  src={process.env.PUBLIC_URL + "./Rectangle 6home.png"}
                  alt=""
                ></img>
              </p>
            </Link>
          </div>
          <img
            src={process.env.PUBLIC_URL + "./image/NoFaceMaskNoEntry.png"}
            alt=""
          ></img>
        </div>
      </div>
      <div className="col-6 registration" style={{ background: "white" }}>
        <div className="registrationcontainer">
          <div className="registrationhead">
            <h3>
              Welcome to ToDo App{" "}
              <img
                src={process.env.PUBLIC_URL + "./image/@cherrrryThumb.png"}
                alt=""
              ></img>{" "}
            </h3>
            <h6>Please sign up - into your account and start the adventure</h6>
          </div>
          <form onSubmit={userRegistration} className="form">
            <h2>{/*Sign Up*/}</h2>
            <span>
              <label>Name</label>
              <br></br>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={checkName}
              ></input>
              <br></br>
              <span style={{ color: "red", fontSize: "12px" }}>
                {nameErrors}
                <br></br>
              </span>
              <label>Email</label>
              <br></br>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={checkEmail}
              ></input>
              {emailErrors !== "" && <br></br>}
              <span style={{ color: "red", fontSize: "12px" }}>
                {emailErrors}
                <br></br>
              </span>
              <label>Password</label>
              <br></br>
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={checkPassword}
              ></input>
              <br></br>
              <span style={{ color: "red", fontSize: "12px" }}>
                {passwordErrors}
                <br></br>
              </span>
              <label>Confirm Password</label>
              <br></br>
              <input
                type="password"
                name="password_two"
                placeholder="********"
                onChange={checkConformPassword}
              ></input>
              <br />
              <span style={{ color: "red", fontSize: "12px" }}>
                {conformPasswordErrors}
                <br></br>
              </span>
            </span>
            <p>
              <input type="checkbox" className="remindMe"></input>
              <label>Remember Me</label>
            </p>

            <button className="">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UserRegistration;
