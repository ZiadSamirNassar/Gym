import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "update"
  const [selectedAdmin, setSelectedAdmin] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    role: 'Admin'
  });

  const fetchAdmins = async () => {
    try {
      const res = await fetch('http://localhost:5281/api/admin/all');
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setSelectedAdmin({ firstName: '', lastName: '', email: '', username: '', password: '', phone: '', role: 'Admin' });
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setModalType("update");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this admin?")) return;

    await fetch(`http://localhost:5281/api/admin/delete/${id}`, {
      method: 'DELETE'
    });
    fetchAdmins();
  };

  const handleSubmit = async () => {
    const url = modalType === "add"
      ? 'http://localhost:5281/api/admin/add'
      : `http://localhost:5281/api/admin/update/${selectedAdmin.id}`;

    const method = modalType === "add" ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedAdmin)
    });

    setShowModal(false);
    fetchAdmins();
  };

  if (loading) return <p>Loading admins...</p>;

  return (
    <div style={{ width: "70%", marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL ADMINS</h2>
      <Button variant="success" style={{ marginBottom: "15px" }} onClick={handleAdd}>Add Admin +</Button>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: '3%' }}>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Role</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.username}</td>
              <td>{admin.phone}</td>
              <td>{admin.role}</td>
              <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <Button variant='info' size="sm" onClick={() => alert(`Name: ${admin.firstName} ${admin.lastName}\nEmail: ${admin.email}\nUsername: ${admin.username}\nPassword: ${admin.password}`)}>Show more</Button>
                <Button variant='danger' size="sm" onClick={() => handleDelete(admin.id)}>Delete</Button>
                <Button variant='success' size="sm" onClick={() => handleEdit(admin)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add Admin" : "Update Admin"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName" className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={selectedAdmin.firstName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={selectedAdmin.lastName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={selectedAdmin.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formUsername" className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={selectedAdmin.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={selectedAdmin.password} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={selectedAdmin.phone} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>{modalType === "add" ? "Add" : "Update"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminTable;
