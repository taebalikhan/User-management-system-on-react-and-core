
import React, { useState, useEffect } from 'react';
import api from "../api"; 
import Header from "../Components/Header";

export default function DisplayAll(){

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
    const abortController = new AbortController();
    const token = localStorage.getItem('token'); // This will get token stored locally
        const response = await api.get('/api/user/all', {
          signal: abortController.signal, 
        });
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      useEffect(() => {
        fetchUsers();
      }, []);  
      
    return(
        <>
    <Header/>
    <div className='container'>
      <div className='form-container-details'>
        <div className='form'>
          <div className='container-header'></div>
          <h2>User List</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>First Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Last Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.firstName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.lastName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.emailID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    )
}