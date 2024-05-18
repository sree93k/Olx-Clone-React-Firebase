import React, { Fragment, useContext, useState,useRef } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../Store/Context'
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
const Create = () => {

  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const date=new Date()
  const history=useHistory()
  const fileInputRef = useRef(null);
  const handleSubmit=()=>{
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })
  }


  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      setImage(e.target.files[0]);
    };
  

  return (
    <Fragment>
      <Header />
      <div >
      <h3 class='createMain'>POST YOUR AD </h3>
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
               />
            <br />
          
          <br />
         { image && <img 
            alt="Posts"
            width="200px"
            height="200px"
            src={image? URL.createObjectURL(image):""}
             ></img>}
         
            <br />
            <div>
              <button className='uploadImg' onClick={handleButtonClick}>
                Upload Image
              </button>
              <input
                className='upload'
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                style={{ display: 'none' }} 
              />
            </div>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
          
        </div>
      </card>
      </div>
    </Fragment>
  );
};

export default Create;
