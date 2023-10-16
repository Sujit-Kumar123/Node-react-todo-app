import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "./Post";
import ListView from "./Componet/ListView";

export default function Pagination() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(false);
  const [nPage, setNPage] = useState(0);
  const [gridView,setGridView]=useState(false);
  const [listView,setListView]=useState(true);
  const [totalBlog,setTotalBlog]=useState(0)
  const [blogCount,setBlogCount]=useState(0)
  const [blogPerPage,setBlogPerPage]=useState(0)
  const [selectBlogPerPage,setSelectBlogPerPage]=useState(9)
  const localStorageData=localStorage.getItem("blogToken");
  const storedToken=JSON.parse(localStorageData);
  //console.log(storedToken);

  const maxPageLimit=2;
  
  const numbers = [...Array(currentPage + 1).keys()].slice(1);
  if(numbers.length>3){
    numbers.shift()
  }
//console.log(numbers)
  //Pagination for blogs
//console.log(selectBlogPerPage)
useEffect(() => {
  // Construct the query parameters as an object
  const queryParams = {
    email: storedToken.email,
    page: currentPage,
    limit: selectBlogPerPage,
  };

  // Convert the queryParams object to a query string
  const queryString = new URLSearchParams(queryParams).toString();

  // Make the GET request with the query string
  axios
    .get(`http://localhost:8001/gettodo?${queryString}`)
    .then((res) => {
      setBlogs(res.data)
      console.log("Response Data:", res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}, [selectBlogPerPage, currentPage]);
  const getSearchData = (e) => {
    axios
      .get(process.env.REACT_APP_API_KEY_URL+"search/"+ search)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };
  //console.log(blogs.length);
  //Working of pagination
  const previousPageTwo=()=>{
    if(currentPage===1 || currentPage===2){
      setPrevious(true);
    }
    else{
      setCurrentPage(currentPage - 2);
    }
  }
  const previousPage = () => {
    if (currentPage === 1) {
      setPrevious(true);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage === nPage) {
      setNext(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
    //console.log(currentPage);
  };
  const nextPageTwo=()=>{
    if (currentPage === nPage ||currentPage===nPage-1) {
      setNext(true);
    } else {
      setCurrentPage(currentPage + 2);
    }
    //console.log(currentPage);
  };
  const changeCurrentPage = (n) => {
    setCurrentPage(n);
  };
  const handleGridView=()=>{
  setGridView(true)
  setListView(false)
}
  const handleListView=()=>{
  setGridView(false)
  setListView(true)
}
//Dotted Page Number
let pageIncrementBtn=null;
if(nPage!==currentPage){
  pageIncrementBtn = <li  className=""><Link href="#"
  className="paginationNumber"
  onClick={nextPage}
  disabled={next}>&hellip;</Link></li>
}
let pageDecrementBtn=null;
if(currentPage>maxPageLimit){
  pageDecrementBtn=<li  className=""><Link  href="#"
  className="paginationNumber"
  onClick={previousPage}
  disabled={previous}>&hellip;</Link></li>
}
const handleSelectedChange =(e)=>{
  setSelectBlogPerPage(parseInt(e.target.value))
}
  return (
    <div className="con">
      <div className="search-container">
        <h5><Link to="/" >Todo List</Link></h5>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={getSearchData}
        ></input><div className="searchIcon">
        <img  src={process.env.PUBLIC_URL+"./VectorSearchIcon.png"} alt="" ></img>
        </div>
        <div className="gridListIcon">
        <div className="gridIconSmall">
       
       {!gridView && <Link onClick={handleGridView}>
          <div className="iconDiv">
        <p>
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        </p><p>
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        </p><p>
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 12smallGrid.png"} alt="" ></img> 
        </p>   </div>
          </Link>
          }   

       {gridView && <Link onClick={handleGridView} style={{backgroundColor:"white"}}>
          <div className="iconDiv">
        <p>
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        </p><p>
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        </p><p>
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        <img  src={process.env.PUBLIC_URL+"./image/Ellipse 1smallGrid.png"} alt="" ></img> 
        </p>   </div>
          </Link> }   
        
        </div>
        <div className="listIconSmall" >
        {!listView &&  <Link onClick={handleListView}>
        <div className="listIconDiv">
        <p>
        <img className="listOne" src={process.env.PUBLIC_URL+"./image/Ellipse 4listIconSmall.png"} alt="" ></img> 
        <img  className="listTwo"  src={process.env.PUBLIC_URL+"./image/Rectangle 10listIconSmall.png"} alt="" ></img> 
        </p>
       <p> <img className="listOne"  src={process.env.PUBLIC_URL+"./image/Ellipse 4listIconSmall.png"} alt="" ></img> 
       <img  className="listTwo"  src={process.env.PUBLIC_URL+"./image/Rectangle 10listIconSmall.png"} alt="" ></img> 
        </p>
        <p>
        <img className="listOne"  src={process.env.PUBLIC_URL+"./image/Ellipse 4listIconSmall.png"} alt="" ></img> 
        <img  className="listTwo"  src={process.env.PUBLIC_URL+"./image/Rectangle 10listIconSmall.png"} alt="" ></img> 
        </p>
        </div>
        </Link> }
      {listView && <Link onClick={handleListView} style={{backgroundColor:"white"}}>
        <div className="listIconDiv">
        <p>
        <img className="listOne" src={process.env.PUBLIC_URL+"./image/Ellipse 44listIconSmall.png"} alt="" ></img> 
        <img  className="listTwo"  src={process.env.PUBLIC_URL+"./image/Rectangle 1010listIconSmall.png"} alt="" ></img> 
        </p>
       <p> <img className="listOne"  src={process.env.PUBLIC_URL+"./image/Ellipse 44listIconSmall.png"} alt="" ></img> 
       <img  className="listTwo"  src={process.env.PUBLIC_URL+"./image/Rectangle 1010listIconSmall.png"} alt="" ></img> 
        </p>
        <p>
        <img className="listOne"  src={process.env.PUBLIC_URL+"./image/Ellipse 44listIconSmall.png"} alt="" ></img> 
        <img  className="listTwo"  src={process.env.PUBLIC_URL+"./image/Rectangle 1010listIconSmall.png"} alt="" ></img> 
        </p>
        </div>
        </Link>} 
        </div> 
      {/*   <Link onClick={handleGridView}><TfiLayoutGrid3/></Link>
       <Link onClick={handleListView}><TfiViewListAlt/></Link>   */}
        </div>
     
      </div>
      <div style={{background:" #E5E5E5"}}>
      <div className="posts">
        {!blogs && <p style={{ color: "red" }}>No Blog Found</p>}
        <div className="transitionPost" >
        {blogs && gridView && (
          <div className="post-container">
            {blogs.map((blog, index) => (
              <Post blog={blog} key={index} />
            ))}
          </div>
        )}
        {listView && blogs && <ListView blog={blogs} blogPerPage={blogPerPage} currPage={currentPage} />}
        </div>
      </div>
      <div className="homePagination">
      <div className="row paginationRow">
        <nav>
          <ul className="paginate col-9">
          <li className="paginationArrow">
              <Link
                href="#"
                className=""
                onClick={previousPageTwo}
                disabled={previous}
              >
                {"<<"}
              </Link>
            </li>
            <li className="paginationSingleArrow">
              <Link
                href="#"
                className=""
                onClick={previousPage}
                disabled={previous}
              >
                {"<"}
              </Link>
            </li>
            {pageDecrementBtn}
            {numbers.map((n, i) => (
              <li
             
                key={i}
              >
                <Link
                  href="#"
                  className={`paginationNumber ${currentPage === n ? "active" : ""}`}
                  onClick={() => changeCurrentPage(n)}
                >
                  {n}
                </Link>
              </li>
            ))}
            {pageIncrementBtn}
            <li className="paginationSingleArrow">
              <Link
                href="#"
                className=""
                onClick={nextPage}
                disabled={next}
              >
                {">"}
              </Link>
            </li>
            <li className="paginationArrow">
              <Link
                href="#"
                className=""
                onClick={nextPageTwo}
                disabled={next}
              >
                {">>"}
              </Link>
            </li>
          </ul>

  <ul className="numberPerPage col-3">
    <li>
      <select value={selectBlogPerPage} onChange={handleSelectedChange}>
        <option>9</option>
        <option>12</option>
        <option>15</option>
      </select>
    </li>
    <li className="blogInformation">Displaying {blogCount} of {totalBlog} records</li>
  </ul>

        </nav>
      </div>
      </div>
      </div>
    </div>
  );
}
