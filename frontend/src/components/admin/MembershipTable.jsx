// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

// const MembershipTable = () => {
//   const [memberships, setMemberships] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("add"); // "add" or "update"
//   const [selectedMembership, setSelectedMembership] = useState({
//     id: 0,
//     name: '',
//     duration: '',
//     price: ''
//   });

//   const fetchMemberships = async () => {
//     try {
//       const res = await fetch('http://localhost:5281/api/memberships/all');
//       const data = await res.json();
//       setMemberships(data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMemberships();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedMembership(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAdd = () => {
//     setSelectedMembership({ name: '', duration: '', price: '' });
//     setModalType("add");
//     setShowModal(true);
//   };

//   const handleEdit = (membership) => {
//     setSelectedMembership(membership);
//     setModalType("update");
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this membership?")) return;

//     await fetch(`http://localhost:5281/api/memberships/delete/${id}`, {
//       method: 'DELETE'
//     });
//     fetchMemberships();
//   };

//   const handleSubmit = async () => {
//     const url = modalType === "add"
//       ? 'http://localhost:5281/api/memberships/add'
//       : `http://localhost:5281/api/memberships/update/${selectedMembership.id}`;

//     const method = modalType === "add" ? "POST" : "PUT";

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(selectedMembership)
//     });

//     setShowModal(false);
//     fetchMemberships();
//   };

//   if (loading) return <p>Loading memberships...</p>;

//   return (
//     <div style={{ width: "70%", marginTop: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL MEMBERSHIPS</h2>
//       <Button variant="success" style={{ marginBottom: "15px" }} onClick={handleAdd}>Add Membership +</Button>

//       <Table striped hover bordered>
//         <thead>
//           <tr>
//             <th style={{ width: '3%' }}>Id</th>
//             <th>Name</th>
//             <th>Duration</th>
//             <th>Price ($)</th>
//             <th style={{ textAlign: 'center' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {memberships.map((m) => (
//             <tr key={m.id}>
//               <td>{m.id}</td>
//               <td>{m.name}</td>
//               <td>{m.duration}</td>
//               <td>{m.price}</td>
//               <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
//                 <Button variant='info' size="sm" onClick={() => alert(`Name: ${m.name}\nDuration: ${m.duration}\nPrice: $${m.price}`)}>Show more</Button>
//                 <Button variant='danger' size="sm" onClick={() => handleDelete(m.id)}>Delete</Button>
//                 <Button variant='success' size="sm" onClick={() => handleEdit(m)}>Update</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal for Add / Edit */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{modalType === "add" ? "Add Membership" : "Update Membership"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName" className="mb-2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" name="name" value={selectedMembership.name} onChange={handleInputChange} />
//             </Form.Group>
//             <Form.Group controlId="formDuration" className="mb-2">
//               <Form.Label>Duration</Form.Label>
//               <Form.Control type="text" name="duration" value={selectedMembership.duration} onChange={handleInputChange} />
//             </Form.Group>
//             <Form.Group controlId="formPrice" className="mb-2">
//               <Form.Label>Price</Form.Label>
//               <Form.Control type="number" name="price" value={selectedMembership.price} onChange={handleInputChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSubmit}>{modalType === "add" ? "Add" : "Update"}</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MembershipTable;




import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const MembershipTable = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "update"
  const [selectedMembership, setSelectedMembership] = useState({
    id: 0,
    name: '',
    duration: '',
    price: '',
    benefits: ''
  });

  const fetchMemberships = async () => {
    try {
      const res = await fetch('http://localhost:5281/api/memberships/all');
      const data = await res.json();
      setMemberships(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMembership(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setSelectedMembership({ id: 0, name: '', duration: '', price: '', benefits: '' });
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (membership) => {
    setSelectedMembership(membership);
    setModalType("update");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this membership?")) return;

    await fetch(`http://localhost:5281/api/memberships/delete/${id}`, {
      method: 'DELETE'
    });
    fetchMemberships();
  };

  const handleSubmit = async () => {
    const url = modalType === "add"
      ? 'http://localhost:5281/api/memberships/add'
      : `http://localhost:5281/api/memberships/update/${selectedMembership.id}`;

    const method = modalType === "add" ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedMembership)
    });

    setShowModal(false);
    fetchMemberships();
  };

  if (loading) return <p>Loading memberships...</p>;

  return (
    <div style={{ width: "80%", marginTop: "20px", marginInline: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL MEMBERSHIPS</h2>
      <Button variant="success" style={{ marginBottom: "15px" }} onClick={handleAdd}>
        Add Membership +
      </Button>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: '3%' }}>Id</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Price ($)</th>
            <th>Benefits</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.duration}</td>
              <td>{m.price}</td>
              <td>{m.benefits}</td>
              <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <Button
                  variant='info'
                  size="sm"
                  onClick={() => alert(
                    `Name: ${m.name}\nDuration: ${m.duration}\nPrice: $${m.price}\nBenefits: ${m.benefits}`
                  )}
                >
                  Show more
                </Button>
                <Button
                  variant='danger'
                  size="sm"
                  onClick={() => handleDelete(m.id)}
                >
                  Delete
                </Button>
                <Button
                  variant='success'
                  size="sm"
                  onClick={() => handleEdit(m)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add Membership" : "Update Membership"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedMembership.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDuration" className="mb-2">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={selectedMembership.duration}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={selectedMembership.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBenefits" className="mb-2">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                type="text"
                name="benefits"
                value={selectedMembership.benefits}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalType === "add" ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MembershipTable;

