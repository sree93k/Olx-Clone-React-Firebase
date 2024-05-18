import React, { useContext, useState } from 'react';
import {FirebaseContext} from '../../Store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      history.push('/')
    })
    .catch((error)=>alert(error.message))
  }
function clickLoginLogo()
{
  history.push('/')
}

  return (
    <div>
      <div className="loginParentDiv">
        <img onClick={clickLoginLogo} width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
           
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
         
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link className="signupNav" to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
