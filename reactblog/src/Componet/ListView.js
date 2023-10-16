import React from "react";
import { Link } from "react-router-dom";

const ListView = ({ blog, currPage, blogPerPage }) => {
  return (
    <div className="listViewContainer">
      <table>
        <tr>
          <th className="listTitle firstCol"><span> # 
            <img
              src={process.env.PUBLIC_URL + "./image/Arrow 1Up.png"}
              alt=""
            ></img>
            </span><span className="">IMAGE-TITLE</span> 
            </th>
          
          <th>DESCRIPTIONS</th>
          <th>CATEGORY</th>
          <th>TAGS</th>
          <th>ACTION</th>
        </tr>
        {blog.map((blo, i) => (
          
            <tr key={i} className="listViewData">
              <td className="firstCol" >
             <span>{(currPage - 1) * blogPerPage + 1 + i}</span> 
               {/* <img
                  className="listViewImage"
                  src={process.env.REACT_APP_API_KEY_GET_IMAGE + blo.image}
                  alt=""
                ></img> */}
              <span className="listViewFirstColTitle">  { blo.title}
                </span>
              </td>
              <td>
                <div className="listViewDescription">{blo.desctiption}</div>
              </td>
              <td>
                <select>
                  <option>Plugins</option>
                  <option>Ok</option>
                </select>
              </td>
              <td className="tags">
                <span>Wordpress Plugins</span>
                <span> Discount</span>
                <span> e-commerce <br></br></span>
                <span> E-commerce Website</span>
                <span>Mailchimp</span>
                <span>
                <img src={process.env.PUBLIC_URL+"./image/Ellipse 10Tag.png"} alt=""></img>
                <img src={process.env.PUBLIC_URL+"./image/Ellipse 11Tag.png"} alt=""></img>
                <img src={process.env.PUBLIC_URL+"./image/Ellipse 12Tag.png"} alt=""></img>
                <img src={process.env.PUBLIC_URL+"./image/Ellipse 13Tag.png"} alt=""></img>
                </span>
              </td>
              <td className="action">
                <Link to={`/read/${blo.id}`}>
                <img className="pen" src={process.env.PUBLIC_URL+"./image/VectorPen.png"} alt=""></img>
                  <img src={process.env.PUBLIC_URL+"./image/VectorEdit.png"} alt=""></img>
                </Link>
                <Link to={`/read/${blo.id}`}>
                <img className="downloadHead" src={process.env.PUBLIC_URL+"./image/VectorDownloadHead.png"} alt=""></img>
                  <img src={process.env.PUBLIC_URL+"./image/VectorDownload.png"} alt=""></img>
                </Link>
                <Link to={`/read/${blo.id}`}>
                  <img src={process.env.PUBLIC_URL+"./image/VectorDelete.png"} alt=""></img>
                </Link>
              </td>
            </tr>
          
        ))}
      </table>
    </div>
  );
};

export default ListView;
