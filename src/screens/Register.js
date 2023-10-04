import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  let nevigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", address: "", number:"" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, address: credentials.address , number: credentials.number}))
    const response = await fetch("http://localhost:8888/api/createUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, address: credentials.address, number: credentials.number })
    });
    const json = await response.json()
    console.log(json);

     if(!json.success){
      alert("Enter valid credetials");
    }
    if (json.success) {
      nevigate("/login");
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
    <div>
      <Navbar name={credentials.name} />
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uername" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.passaword} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="uername" className="form-label">Number</label>
            <input type="text" className="form-control" id="number" name="number" value={credentials.number} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address" value={credentials.address} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Register</button>
          <Link to="/login" className="m-3 btn btn-primary">Login</Link>
        </form>
      </div>
    </div>
  )
}