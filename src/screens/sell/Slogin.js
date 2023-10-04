import React ,{useState} from 'react'
import SNavbar from "../../components/SNavbar"
import { Link, useNavigate } from 'react-router-dom';

export default function Slogin() {
    let nevigate = useNavigate();
    const [credential,setcredential] = useState({name:"", email:"",password:""})
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:8888/api/loginSeller",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credential.name, email:credential.email, password:credential.password})
      });
      const json = await response.json();
      console.log(json);
  
      if(!json.success){
        alert("Enter valid credetials");
      }
      //storing data for later use
      if(json.success){
        localStorage.setItem("userName",credential.name)
        localStorage.setItem("userEmail",credential.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        nevigate("/shome");
      }
   
    }
    const onChange = (event) => {
      setcredential({...credential,[event.target.name]:event.target.value});
    }
    return (
      <div>
        <SNavbar/>
        <div className="container my-4">
        <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
    <label htmlFor="email" className="form-label">Username</label>
    <input type="text" className="form-control" id="name" name="name" value={credential.name} onChange={onChange} aria-describedby="emailHelp"/>
  </div> */}
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} />
    </div>
    <button type="submit" className="btn btn-success">Login</button>
    <Link to="/sregister" className="m-3 btn btn-primary">New use Register</Link>
  </form>
        </div>
      </div>
    )
  }