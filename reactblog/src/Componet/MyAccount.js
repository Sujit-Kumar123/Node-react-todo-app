import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const MyAccount = () => {
  const [localUserId, setLocalUserId] = useState();
  const [localUserName, setLocalUserName] = useState("");
  const [localUserMail, setLocalUserMail] = useState("");
  
  const [changePassword, setChangePassword] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [conformPasswordError, setConformPasswordError] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const getUserData = () => {
    if (localStorage.getItem("blogToken")) {
      const localStorageData = localStorage.getItem("blogToken");
      const storedToken = JSON.parse(localStorageData);
      //console.log(storedToken);
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
          setLocalUserName(response.data.user.name);
          setLocalUserMail(response.data.user.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getUserData();
    axios
      .get(process.env.REACT_APP_API_KEY_URL + "get_profile/" + localUserId)
      .then((response) => {
        console.log(response.data);
        setProfilePicture(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [localUserId]);
 
  const handlePassword = () => {
    
    setChangePassword(true);
    setEditProfile(false);
  };
  const handleProfile = () => {
  
    setChangePassword(false);
    setEditProfile(true);
  };
  const checkOldPassword = (e) => {
    setOldPassword(e.target.value);
    let x = /[0-9]/;
    if (x.test(e.target.value) === false) {
      setPasswordError("Password must contain at least one number.");
    } else if (/[a-z]/.test(e.target.value) === false) {
      setPasswordError("Password must contain at least one lower case latter.");
    } else if (/[A-Z]/.test(e.target.value) === false) {
      setPasswordError("Password must contain at least one upper case latter.");
    } else if (e.target.value.length < 4) {
      setPasswordError("Password length should be gather then 4.");
    } else {
      setPasswordError("");
    }
  };
  const checkNewPassword = (e) => {
    setNewPassword(e.target.value);
    let x = /[0-9]/;
    if (x.test(e.target.value) === false) {
      setNewPasswordError("Password must contain at least one number.");
    } else if (/[a-z]/.test(e.target.value) === false) {
      setNewPasswordError(
        "Password must contain at least one lower case latter."
      );
    } else if (/[A-Z]/.test(e.target.value) === false) {
      setNewPasswordError(
        "Password must contain at least one upper case latter."
      );
    } else if (e.target.value.length < 4) {
      setNewPasswordError("Password length should be gather then 4.");
    } else {
      setNewPasswordError("");
    }
  };
  const checkConfirmPassword = (e) => {
    setConfirmNewPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setConformPasswordError("Password miss match.");
    } else {
      setConformPasswordError("");
    }
  };
  function validateData(oldPassword, newPassword, confirmNewPassword) {
    if (!oldPassword) {
      setPasswordError("Name field should not empty.");
      return false;
    } else if (!newPassword) {
      setNewPasswordError("Email field should not empty.");
      return false;
    } else if (newPassword.length < 4) {
      setNewPasswordError("Password length should be gather then 4.");
      return false;
    } else if (newPassword.length >= 16) {
      setNewPasswordError("Password length should be less then 16.");
      return false;
    } else if (!confirmNewPassword) {
      setConformPasswordError("Conform Password field should not empty.");
      return false;
    } else if (newPassword !== confirmNewPassword) {
      setConformPasswordError("Conform Password field should not matched.");
      return false;
    } else {
      return true;
    }
  }
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (validateData(oldPassword, newPassword, confirmNewPassword)) {
      const jsonData = {
        old_password: oldPassword,
        password: newPassword,
        confirm_password: confirmNewPassword,
      };
      const localStorageData = localStorage.getItem("blogToken");
      const storedToken = JSON.parse(localStorageData);
      //console.log(storedToken);
      const token = storedToken.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          process.env.REACT_APP_API_KEY_URL + "change_password",
          jsonData,
          config
        )
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("blogToken");
          navigate("/login");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Change Password success !",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Password should not Change !",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      console.log("error");
    }
  };
  
  const handleProfilePicture = () => {
    const formData = new FormData();
    formData.append("user_id", localUserId);
    formData.append("image", image);
    axios
      .post(process.env.REACT_APP_API_KEY_URL + "add_profile", formData, {})
      .then((result) => {
        //console.log(result.data)
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.data.Result,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Profile is not Updated !",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myAccount");
      });
    navigate("/");
  };

  return (
    <div>
      <div className="myAccount">
        <div className="row">
          <div className="col-4 myProfileSide">
            <h3>User Profile </h3>
            <div className="profilePicture">
              {profilePicture.map((pro, i) => (
                <img
                  key={i}
                  src={
                    process.env.REACT_APP_API_KEY_GET_IMAGE + pro.profile_image
                  }
                  alt=""
                  style={{ height: "200px" }}
                />
              ))}
              {profilePicture.length===0 && <> <img
                  src={process.env.PUBLIC_URL+"/altAccountimg.png"}
                  alt=""
                  style={{ height: "200px" }}
                /></>}
            </div>
            <div className="profileContent">
              <h5>{localUserName}</h5>
              <p>{localUserMail}</p>
              <hr></hr>
            </div>
            <div className="profileContentList">
              <ul>
                <li>
                  <Link onClick={handlePassword}>Change Password</Link>
                </li>
                <li>
                  <Link onClick={handleProfile}>Edit Profile</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-8">
            
            {changePassword && (
              <>
                <h3>Change the password</h3>
                <div className="row changePassword">
                  <form onSubmit={handleChangePassword} method="POST">
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Old Password"
                      onChange={checkOldPassword}
                      required
                    ></input>
                    <br />
                    <span style={{ color: "red" }}>{passwordError}</span>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      onChange={checkNewPassword}
                      required
                    ></input>
                    <br />
                    <span style={{ color: "red" }}>{newPasswordError}</span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Confirm Password"
                      onChange={checkConfirmPassword}
                      required
                    ></input>
                    <br />
                    <span style={{ color: "red" }}>{conformPasswordError}</span>
                    <Button className="" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>
              </>
            )}
            {editProfile && (
              <>
                <h3>Edit Profile</h3>
                <div className="row">
                  <div
                    className="form-container"
                    style={{ height: "50%", margin: "10% 5% " }}
                  >
                    <form onSubmit={handleProfilePicture} method="POST">
                      <h2>Add Profile Picture</h2>
                      <input
                        type="file"
                        name="image"
                        placeholder="Write title"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                      ></input>
                      <br />
                      <button className="newblog-btn" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
