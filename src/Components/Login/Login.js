import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../Store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setErrors]=useState({})
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();


  const validate = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
      console.log("errors",errors);
    }
     else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
  
    if (!password) errors.password = 'Password is required';
    else if (password.length <8) errors.password = 'Password must be at least 8 characters long';

    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors=validate()
    if(Object.keys(validationErrors).length>0)
    {
      setErrors(validationErrors)
      console.log(errors);
      return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setErrors(error.message)
        console.log(errors);
      });
  };



  function clickLoginLogo() 
  {
    history.push('/');
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img onClick={clickLoginLogo} width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <button>Login</button>
        </form>
        <Link className="signupNav" to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
