import React, { useEffect} from 'react'
import {
  useLocation,
  Link,
  useNavigate
} from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  React.useEffect((e) => {
  console.log(location)
  }, [location]);
 const handleLogout = () => 
 {
  localStorage.removeItem('token');
  navigate('/login');
 }

  return (
    <div>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
  <p className="navbar-brand" >ThinkBinder</p>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}>
        <Link className="nav-link" to="/home">
          <i className="fa fa-home"></i>
          Home
          <span className="sr-only"></span>
          </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
        <Link className="nav-link" to="/about">
          <i className="fa fa-envelope-o">
            <span className="badge badge-danger">About</span>
          </i>
          About
        </Link>
      </li>
      
    </ul>
    <ul className="navbar-nav ">
      <li className="nav-item">
        <Link className="nav-link" to="/topics">
          <i className="fa fa-bell">
            <span className="badge badge-info">Imp</span>
          </i>
          Topics
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fa fa-globe">
            <span className="badge badge-success">11</span>
          </i>
          Test
        </Link>
      </li>
    </ul>
   
    {!localStorage.getItem('token')?<form className="d-flex">
     <Link className='btn btn-dark mx-2' to="/login" role="button">Login</Link>
     <Link className='btn btn-dark mx-2' to="/signup" role="button">Signup</Link>
    </form> : <button onClick={handleLogout} className="btn btn-dark mx-2">Logout</button>}
  </div>
</nav>

    </div>
  )
}
