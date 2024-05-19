import React, { Fragment, useContext, useState,useRef } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../Store/Context'
import { useHistory } from 'react-router-dom';
import uploadImgLogo from './icons8-upload-image-48.png'

const Create = () => {
  const [errors,setErrors]=useState({})
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const date=new Date()
  const history=useHistory()
  const fileInputRef = useRef(null);
  

  const validate = () => {
    const errors = {};
    if (!name) {errors.name = 'Name is required'}
    else if (!/^[A-Za-z]+$/.test(name)) {
      errors.name = 'Name can only contain alphabets';
    }
    if (!category) {errors.category = 'Category is required'}
    else if (!/^[A-Za-z]+$/.test(category)) {
      errors.category = 'Category can only contain alphabets';
      
    }
    
    if (!price) {
      errors.price = 'Price is required';
    } else if (!/^\d+$/.test(price)) {
      errors.price = 'Price is invalid';
    }
    if(!image)
    {
      errors.image='Image is required'
    }
    return errors;
  };


  const handleSubmit=(e)=>{
    e.preventDefault()
    const validateError=validate()

    if(Object.keys(validateError).length>0)
    {
      setErrors(validateError)
      return;
    }
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
          
            
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder='Product Name'
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              placeholder='Category'
            />
          {errors.category && <p className="error">{errors.category}</p>}
            <input 
              className="input" 
              type="text"
              id="fname"
              name="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              placeholder='Price'
               />
            {errors.price && <p className="error">{errors.price}</p>}
          <div className='ImageUploadMain'>
          <div className='uploadedBtn'>
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
            <div className='uploadedImg'>
            { image ? <img 
            alt="Posts"
            width="200px"
            height="200px"
            src={image? URL.createObjectURL(image):''}
             ></img>:<img 
             alt="Posts"
             width="200px"
             height="200px"
             src={uploadImgLogo? uploadImgLogo:''}
              ></img>}
            </div>  

          </div>
          {errors.image && <p className="error">{errors.image}</p>}
        
            {/* <br /> */}
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
          
        </div>
      </card>
      </div>
    </Fragment>
  );
};

export default Create;
