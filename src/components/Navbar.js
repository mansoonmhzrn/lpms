import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import image from "./logo.png"


export default function Navbar(props) {
  // const [CartVeiw, setCartView] = useState(false);
  const navigate = useNavigate();
  let userName = localStorage.getItem("userName")

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/login");


  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic mx-5" to="/"><img src={image} style={{height:"80px", paddingBottom:"15px"}}></img></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    
    {(!localStorage.getItem("authToken"))?
    <div className='d-flex'>
      <Link className='btn bg-info text-light mx-1' to="/login">Login</Link>
      <Link className='btn bg-info text-light mx-1' to="/register">Register</Link>
    </div>
    :
    <div className='d-flex'>
      
       
      <Link className='btn bg-info text-red mx-1' to="/login" onClick={handleLogout}>Logout</Link>
      <Link className='btn  text-info  mx-1' to="/register">{userName}</Link>
    </div>
}
  </div>
</nav>
    </div>
  )
}
