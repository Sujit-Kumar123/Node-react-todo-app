import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

export default function Footer() {
  const location=useLocation()
  const scrollToTop=()=>{
    animateScroll.scrollToTop()
  }
  if(location.pathname==='/login' || location.pathname==='/registration'){
    return null
  };
  return (<>
  <div className='footer'>
  <p>
    <img src={process.env.PUBLIC_URL+"./image/CopyWriteText.png"} alt=""></img>
    <img className='footerBox' src={process.env.PUBLIC_URL+"./image/Rectangle 12Footer.png"} alt=""></img>
    <Link onClick={scrollToTop} ><img className='footerVector' src={process.env.PUBLIC_URL+"./image/VectorFooter.png"} alt=""></img></Link>
  </p>
  </div>
  </>
   
  )
}
