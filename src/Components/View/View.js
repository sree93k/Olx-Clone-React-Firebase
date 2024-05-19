import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';
import Button from 'react-bootstrap/Button';
function View() {

  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)
  
  useEffect(()=>{
    if (postDetails && postDetails.userId) {
    const {userId}=postDetails
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
      res.forEach(doc => {
        setUserDetails(doc.data())
        console.log(userDetails);
      });

    })}
  },[])

  return (
    <div className="viewParentDiv">
    
    {postDetails  ? (
        <div className="imageShowDiv">
          <img src={postDetails.url} alt="" />
        </div>
      ) : null}
      <div className="rightSection">
      <h3 className='products details'>Product Details</h3>
      {postDetails && (
          
          <div className="productDetails">
            
            <p className='pDetails'> &#x20B9; {postDetails.price} </p>
            <h2 className='pDetails'>{postDetails.name}</h2>
            <h2 className='pDetails'>{postDetails.category}</h2>
           
            <span>{postDetails.createdAt}</span>

          </div>
        )}
         {/* <Button className='pDetails' variant="success">Buy Now</Button>{' '} */}
         <button className='buyNow'>Buy Now</button>
        {userDetails &&
        <div className="contactDetails">
        <p>Seller details</p>
        <p>{userDetails.username}</p>
        <p>{userDetails.phone}</p>
      </div>}
      </div>
    
    </div>
  );
}
export default View;
