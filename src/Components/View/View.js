import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';
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
      {postDetails && (
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>{postDetails.name}</span>
            <p>{postDetails.category}</p>
            <span>{postDetails.createdAt}</span>
          </div>
        )}
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
