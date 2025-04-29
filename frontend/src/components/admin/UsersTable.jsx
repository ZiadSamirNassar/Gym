import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:5281/api/users/all')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5281/api/users/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User deleted successfully!');
        fetchUsers(); // Refresh the table after deletion
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div style={{ width: '70%', marginTop: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>ALL USERS</h2>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Age</th>
            
            {/* <th>Plan</th> */}
            <th>Type</th>
            <th>Actions</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              {/* <td>{user.plan}</td> */}
              <td>{user.type}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
