import React, {useState} from 'react'
import { useHistory, useNavigate } from "react-router-dom";
export default function Signup(props) {
    const [state, setState] = useState('');
    let navigate = useNavigate();
    const [creditinal, setCreditinal] = useState({name: "", email: "", password:""})
    const handleclick = (e) => {
        setState(e.target.value)
        setCreditinal({...creditinal, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const response = await fetch('http://localhost:8000/api/auth/createuser', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               },
            body: JSON.stringify({name: creditinal.username, email: creditinal.email, password: creditinal.password }),
          });
          const json = await response.json();
          console.log(json)
          if(json.success)
          {
            localStorage.setItem('token', json.token);
            navigate('/home');
            props.showAlert("Account Created Successfully", "success")
          }else{
            
            props.showAlert("Invalid Credentials", "danger")
          }
        }
  return (
    <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" className="form-control" id="username" name="username" aria-describedby="username" placeholder="Enter username"  onChange={handleclick}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email"  onChange={handleclick}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handleclick} minLength={5} required  />
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password" onChange={handleclick} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}
