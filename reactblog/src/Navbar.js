import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Account from "./Componet/Account";
import axios from "axios";
//import {LuBell} from "react-icons/lu"
const Navbar=()=> {
  const [isTokenExist, setTokenExit] = useState(false);
  const [localUserId, setLocalUserId] = useState();
  const [showAccounts, setShowAccounts] = useState(false);
  const [profilePicture, setProfilePicture] = useState([]);
  const [localUserName,setLocalUserName]=useState("");
  const [localUserEmail,setLocalUserEmail]=useState("");
  const location=useLocation();
  

  const getUserId = () => {
    if (localStorage.getItem("blogToken")) {
      setTokenExit(true);
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
          setLocalUserEmail(response.data.user.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getUserId();
    axios
      .get(process.env.REACT_APP_API_KEY_URL + "get_profile/" + localUserId)
      .then((response) => {
        // console.log(response.data);
        setProfilePicture(response.data);
        //console.log(response.data[0].profile_image)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [localUserId]);

  //console.log(profilePicture)
  //console.log(localUserId)


  const clickAccount = () => {
    setShowAccounts(!showAccounts);
  };
  console.log(location.pathname);
  if(location.pathname==='/login' || location.pathname==='/registration'){
    return null
  };
 
  return (
    <div className="nav">
      <Link to="/" className="nav-head">
        <img src={process.env.PUBLIC_URL+"./Rectangle 6home.png"} alt="" ></img>
        <img src={process.env.PUBLIC_URL+"./Rectangle 6home.png"} alt="" ></img>
        <br></br>
        <img src={process.env.PUBLIC_URL+"./Rectangle 6home.png"} alt="" ></img>
        <img src={process.env.PUBLIC_URL+"./Rectangle 6home.png"} alt="" ></img>
      </Link>
      {!isTokenExist && (
          <><ul className="menuOne">
            <li className="menu-btn">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="sideBar">
            <img src={process.env.PUBLIC_URL+"./Rectangle 6home.png"} alt="" ></img>
            </li>
            <li className="menu-btn">
              <Link to="registration" id="signUp">Sign Up</Link>
            </li>
            <li className="sideBar">
            <img src={process.env.PUBLIC_URL+"./Rectangle 6home.png"} alt="" ></img>
            </li>
            <li className="menu-btn">
              <Link to="login">Sign In</Link>
            </li>
            <li className="vectorProfileIcon">
              <Link to="login">
              <img src={process.env.PUBLIC_URL+"./VectorProfileIcon.png"} alt="" ></img>
              </Link>
            </li>
            </ul>
          </>
          )}
           {isTokenExist && (
          <>
          <ul className="menuOne">
          <li className="menu-btn">
          <Link to="addPost">Add Todo</Link>
           </li>
            <li className="vectorProfileIconUser">
              <Link className="" onClick={clickAccount}>
               {profilePicture.length===0 && <><img
                  src={process.env.PUBLIC_URL + "/VectorProfileIcon.png"}
                  alt="alt"
                  className="bellIcon"
                ></img></>} 
                {profilePicture.length!==0 && <>{profilePicture.map((pic,i)=>(<img key={i} src={process.env.REACT_APP_API_KEY_GET_IMAGE + pic.profile_image}   alt="alt"
                  className="bellIcon"></img>))}</>}
              </Link>
              <Account show={showAccounts} picture={profilePicture} name={localUserName} email={localUserEmail}/>
            </li>
            </ul> </>
        )}
      <ul>
        {/*<li className="menu-btn">
            <Link onClick={logOut}>Log out</Link>
          </li>
          */}
      </ul>
        
       
      
    </div>
  );
}
export default Navbar;