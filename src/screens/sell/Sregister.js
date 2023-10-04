import React,{useState} from 'react'
import SNavbar from "../../components/SNavbar"
import {Link, useNavigate } from 'react-router-dom';

export default function Sregister() {
    let nevigate = useNavigate();
    const [credential, setcredential] = useState({ name: "", email: "", password: "", address: "", snumber:"" })
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.location, snumber: credential.snumber }))
      const response = await fetch("http://localhost:8888/api/createSeller", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, address: credential.address, snumber: credential.snumber })
      });
      const json = await response.json()
      console.log(json);
  
       if(!json.success){
        alert("Enter valid credetials");
      }
      if (json.success) {
        nevigate("/slogin");
      }
    }
    const onChange = (event) => {
      setcredential({ ...credential, [event.target.name]: event.target.value });
    }
    return (
      <div>
        <SNavbar />
        <div className="container my-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" name="name" value={credential.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Number</label>
              <input type="text" className="form-control" id="username" name="snumber" value={credential.snumber} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={credential.address} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="m-3 btn btn-success">Register</button>
            <Link to="/slogin" className="m-3 btn btn-primary">Login</Link>
          </form>
        </div>
      </div>
    )
  }