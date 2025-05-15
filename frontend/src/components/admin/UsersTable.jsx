import React, { useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import usePolling from '../../hooks/usePolling';

const UsersTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      const authData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }
      const response = await fetch('https://localhost:7052/Members', {
        headers: {
          'Authorization': `Bearer ${authData?.token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setMembers(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // استخدام البولينج كل 4 ثواني
  usePolling(fetchMembers, 4000);

  if (loading && members.length === 0) return <div>Loading initial data...</div>;

  return (
    <div style={{width: "70%", marginTop: "20px"}}>
      <h2 style={{textAlign: "center", marginBottom: "15px"}}>
        ALL USERS 
        {error && <small className="text-danger ml-2">Error: {error}</small>}
      </h2>
      
      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{width: '3%'}}>#</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id || index}>
              <td>{index + 1}</td>
              <td>{member.name || 'N/A'}</td>
              <td>{member.age || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;