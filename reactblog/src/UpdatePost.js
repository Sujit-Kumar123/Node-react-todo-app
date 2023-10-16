import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Update(props) {
  const { _id } = useParams();
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8001/update_todo_by_id?_id=${_id}`)
      .then((res) => {
        setTitle(res.data.title);
        //console.log(res.data[0])
        setDescriptions(res.data.desctiption);
        setImage(res.data[0].image);  
      })
      .catch((err) => console.log(err));
  }, [_id]);
  //console.log(title)
  //console.log(descriptions)
  //console.log(image)

  //Update code
  const handleUpdate = (_id) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("image", image);
    formData.append("id", _id);
    formData.append("_method", "PUT");
    axios
      .post(`http://localhost:8001/update_todo_by_id?_id=${_id}`, formData)
      .then((res) => {
        navigate(`/read/${_id}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.Result,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        navigate(`/update/${_id}`);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Your Blog is not Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      });
      navigate('/');
  };
  return (<>
  <Link to={`/read/${_id}`} >Back</Link>
    <div className="form-container">
      <form onSubmit={() => handleUpdate(_id)}>
        <h2>Update Blog</h2>
        <input
          type="text"
          name="title"
          placeholder="Write title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <br />
        <input
          type="text"
          name="descriptions"
          placeholder="Write description here"
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
          required
        ></input>
        <br />
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <br />
        <button className="newblog-btn">Submit</button>
      </form>
    </div></>
  );
}
export default Update;
