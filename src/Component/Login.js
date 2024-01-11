import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
export default function Login(props) {
   const [state, setState] = useState('');
    let history = useNavigate();
   const [creditinal, setCreditinal] = useState({email: "", password:""})
    const handleclick = (e) => {
        setState(e.target.value)
        setCreditinal({...creditinal, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               },
            body: JSON.stringify({email: creditinal.email, password: creditinal.password }),
          });
          const json = await response.json();
          
          if(json.success)
          {
            localStorage.setItem('token', json.token);
            props.showAlert("Account Login Successfully", "success")
            history("/home")
           
          }else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={creditinal.email} aria-describedby="emailHelp" placeholder="Enter email"  onChange={handleclick}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password"  value={creditinal.password} placeholder="Password" onChange={handleclick} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
