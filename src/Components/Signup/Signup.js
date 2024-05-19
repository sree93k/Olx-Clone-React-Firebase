import React, { useState,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [errors, setErrors] = useState({name:null,email:null,phone:null,password:null});
  const {firebase}=useContext(FirebaseContext)
  
  const history=useHistory()

  const validate = () => {
    const errors = {};
    if (!name) {errors.name = 'Name is required'}
    else if (!/^[A-Za-z]+$/.test(name)) {
      errors.name = 'Name can only contain alphabets';
      
    }
    if (!email) {
      errors.email = 'Email is required';
      console.log("errors",errors);
    }
     else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number is invalid';
    }
    if (!password) errors.password = 'Password is required';
    else if (password.length <8) errors.password = 'Password must be at least 8 characters long';

    return errors;
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // alert(errors)
      console.log("errors",errors);
      
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      result.user.updateProfile({displayName:name})
      .then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:name,
          phone:phone,
          email:email,
        }).then(()=>{
          history.push('login')
        })
        .catch((error)=>{
          console.log(error.message);
        })
      })
      .catch((error) => {
        console.log(error.message);
        setErrors("Account Already Exist")
      });
    })
    .catch((error)=>{
      console.log(error.message);
      setErrors(error.message)
    })
    
    
  }
function clickSignUpLogo()
{
  history.push('/')
}

  return (
    <div>
      <div className="signupParentDiv">
        <img onClick={clickSignUpLogo} width="200px" height="200px" src={Logo}></img>
        <form className="signUpform" onSubmit={handleSubmit}>
          {/* <label htmlFor="fname">Username</label> */}
          {/* <br /> */}
          {errors==="The email address is already in use by another account."?
          <p className="error">{errors}</p>:""}
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id="fname"
            name="name"
            placeholder='Name'
          />
          {errors.name && <p className="error">{errors.name}</p>}
          {/* <br /> */}
          {/* <label htmlFor="fname">Email</label> */}
          {/* <br /> */}
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder='Email'
          />
           {errors.email && <p className="error">{errors.email}</p>}
          {/* <br /> */}
          {/* <label htmlFor="lname">Phone</label> */}
          {/* <br /> */}
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            placeholder='Phone'
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          {/* <br /> */}
          {/* <label htmlFor="lname">Password</label> */}
          {/* <br /> */}
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder='New Password'
          />
          {/* <br /> */}
          {errors.password && <p className="error">{errors.password}</p>}
          {/* <br /> */}
          <button>Signup</button>
        </form>
       <Link className="loginNav" to='/login'>Login</Link>
      </div>
      <ToastContainer />
    </div>
  );
}
