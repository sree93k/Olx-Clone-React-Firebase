import React, { useState,useContext} from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default function Signup() {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()


  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(firebase);
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      result.user.updateProfile({displayName:name})
      .then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:name,
          phone:phone,
          email:email,
          password:password
        }).then(()=>{
          history.push('login')
        })
      })
    })
  }
function clickSignUpLogo()
{
  <Link to="/"></Link>
}

  return (
    <div>
      <div className="signupParentDiv">
        <img onClick={clickSignUpLogo} width="200px" height="200px" src={Logo}></img>
        <form className="signUpform" onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            
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
          <button>Signup</button>
        </form>
       <Link className="loginNav" to='/login'>Login</Link>
      </div>
    </div>
  );
}
