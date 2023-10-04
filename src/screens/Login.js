import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import {Link,useNavigate} from 'react-router-dom'

export default function Login() {
  let nevigate = useNavigate();
  const [credentials,setcredentials] = useState({ name:"",email:"",password:""})

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8888/api/loginUser",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({name:credentials.name , email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    console.log(json);

    if(!json.success){
      alert("Enter valid credetials");
    }
    if(json.success){
      localStorage.setItem("userName",credentials.name)
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      nevigate("/buy");
    }
 
  }
  const onChange = (event) => {
    setcredentials({...credentials,[event.target.name]:event.target.value});
  }
  return (
    <div>
      <Navbar/>
      <div className="container my-4">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-info text-light">Login</button>
  <Link to="/register" className="m-3 btn btn-primary">New use Register</Link>
</form>
      </div>
     
    </div>
  )
}