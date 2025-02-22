import Header from "../Components/Header";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../api"; 

export default function UserDetails() {
  const { userId } = useParams();
  console.log('User ID from URL:', userId); 

  const [userDetail, setUserDetail] = useState(null); 

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem('token'); // This will get token stored locally
        console.log('JWT Token:', token); 

        const response = await api.get(`/api/user/details/${userId}`, {
          signal: abortController.signal, 
        });
        console.log('API Response:', response.data); 

        if (response.data) {
          setUserDetail(response.data);
          console.log('User Detail Updated:', response.data); 
        } else {
          console.error('API returned null or undefined data');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) { 
      fetchUserDetail();
    }
  }, [userId]);

  return (
    <>
      <Header />
      <div className='container'>
      <div className='form-container-details'>
        <div className='form'>
          <div className='container-header'></div>
            <h2>User Detail</h2>
            {userDetail ? ( 
              <div>
                <label><strong>Name:</strong> {`${userDetail.firstName} ${userDetail.lastName}`}</label><br />
                <label><strong>Phone No:</strong> {userDetail.phoneNo}</label><br />
                <label><strong>Email ID:</strong> {userDetail.emailID}</label><br />
              </div>
            ) : (
              <p>No user details available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}