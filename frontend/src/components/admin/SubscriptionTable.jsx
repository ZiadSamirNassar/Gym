// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
// import Spinner from 'react-bootstrap/Spinner';

// const SubscriptionTable = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMoreModal, setShowMoreModal] = useState(false);
//   const [currentSubscription, setCurrentSubscription] = useState(null);

//   const fetchSubscriptions = async () => {
//     try {
//       const response = await fetch('http://localhost:5281/api/subscriptions/all');
//       const data = await response.json();
//       setSubscriptions(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this subscription?")) return;

//     try {
//       await fetch(`http://localhost:5281/api/subscriptions/delete/${id}`, {
//         method: 'DELETE'
//       });
//       setSubscriptions(subscriptions.filter(s => s.id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleShowMore = (subscription) => {
//     setCurrentSubscription(subscription);
//     setShowMoreModal(true);
//   };

//   if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

//   return (
//     <div style={{ width: "70%", marginTop: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL SUBSCRIPTIONS</h2>

//       <Table striped hover bordered>
//         <thead>
//           <tr>
//             <th style={{ width: '3%' }}>Id</th>
//             <th>Username</th>
//             <th>Membership Name</th>
//             <th>Duration</th>
//             <th>Price</th>
//             <th>Subscription Date</th>
//             <th style={{ textAlign: "center" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscriptions.map((subscription, index) => (
//             <tr key={subscription.id}>
//               <td>{index + 1}</td>
//               <td>{subscription.username}</td>
//               <td>{subscription.membershipName}</td>
//               <td>{subscription.duration} months</td>
//               <td>${subscription.price}</td>
//               <td>{new Date(subscription.subscriptionDate).toLocaleDateString()}</td>
//               <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
//                 <Button variant='info' size="sm" onClick={() => handleShowMore(subscription)}>Show more</Button>
//                 <Button variant='danger' size="sm" onClick={() => handleDelete(subscription.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Show More Modal */}
//       <Modal show={showMoreModal} onHide={() => setShowMoreModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Subscription Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentSubscription && (
//             <>
//               <p><strong>Username:</strong> {currentSubscription.username}</p>
//               <p><strong>Membership Name:</strong> {currentSubscription.membershipName}</p>
//               <p><strong>Duration:</strong> {currentSubscription.duration} months</p>
//               <p><strong>Price:</strong> ${currentSubscription.price}</p>
//               <p><strong>Subscription Date:</strong> {new Date(currentSubscription.subscriptionDate).toLocaleDateString()}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowMoreModal(false)}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SubscriptionTable;

//-------------------------------------------------------------------------------------------------------



// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
// import Spinner from 'react-bootstrap/Spinner';
// import Form from 'react-bootstrap/Form';

// const SubscriptionTable = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMoreModal, setShowMoreModal] = useState(false);
//   const [currentSubscription, setCurrentSubscription] = useState(null);

//   const fetchSubscriptions = async () => {
//     try {
//       const response = await fetch('http://localhost:5281/api/subscriptions/all');
//       const data = await response.json();
//       setSubscriptions(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this subscription?")) return;

//     try {
//       await fetch(`http://localhost:5281/api/subscriptions/delete/${id}`, {
//         method: 'DELETE'
//       });
//       setSubscriptions(subscriptions.filter(s => s.id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleShowMore = (subscription) => {
//     setCurrentSubscription(subscription);
//     setShowMoreModal(true);
//   };

//   // ✨ New: Toggle checkbox in frontend
//   const togglePaymentStatus = (id) => {
//     setSubscriptions(prev =>
//       prev.map(subscription =>
//         subscription.id === id
//           ? { ...subscription, isPaymentOk: !subscription.isPaymentOk }
//           : subscription
//       )
//     );
//   };

//   if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

//   return (
//     <div style={{ width: "85%", marginTop: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL SUBSCRIPTIONS</h2>

//       <Table striped hover bordered>
//         <thead>
//           <tr>
//             <th style={{ width: '3%' }}>Id</th>
//             <th>Username</th>
//             <th>Membership Name</th>
//             <th>Duration</th>
//             <th>Price</th>
//             <th>Subscription Date</th>
//             <th>Payment OK</th>
//             <th style={{ textAlign: "center" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscriptions.map((subscription, index) => (
//             <tr key={subscription.id}>
//               <td>{index + 1}</td>
//               <td>{subscription.username}</td>
//               <td>{subscription.membershipName}</td>
//               <td>{subscription.duration} months</td>
//               <td>${subscription.price}</td>
//               <td>{new Date(subscription.subscriptionDate).toLocaleDateString()}</td>
//               <td style={{ textAlign: 'center' }}>
//                 <Form.Check
//                   type="checkbox"
//                   checked={subscription.isPaymentOk}
//                   onChange={() => togglePaymentStatus(subscription.id)}
//                 />
//               </td>
//               <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
//                 <Button variant='info' size="sm" onClick={() => handleShowMore(subscription)}>Show more</Button>
//                 <Button variant='danger' size="sm" onClick={() => handleDelete(subscription.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Show More Modal */}
//       <Modal show={showMoreModal} onHide={() => setShowMoreModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Subscription Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentSubscription && (
//             <>
//               <p><strong>Username:</strong> {currentSubscription.username}</p>
//               <p><strong>Membership Name:</strong> {currentSubscription.membershipName}</p>
//               <p><strong>Duration:</strong> {currentSubscription.duration} months</p>
//               <p><strong>Price:</strong> ${currentSubscription.price}</p>
//               <p><strong>Subscription Date:</strong> {new Date(currentSubscription.subscriptionDate).toLocaleDateString()}</p>
//               <p>
//                 <strong>Payment OK:</strong>{' '}
//                 <Form.Check
//                   type="checkbox"
//                   checked={currentSubscription.isPaymentOk}
//                   readOnly
//                   style={{ marginLeft: "10px" }}
//                 />
//               </p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowMoreModal(false)}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SubscriptionTable;



import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:5281/api/subscriptions/all');
      const data = await response.json();
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscription?")) return;

    try {
      await fetch(`http://localhost:5281/api/subscriptions/delete/${id}`, {
        method: 'DELETE'
      });
      setSubscriptions(subscriptions.filter(s => s.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleShowMore = (subscription) => {
    setCurrentSubscription(subscription);
    setShowMoreModal(true);
  };

  // 🛠 Corrected: Toggle and Save to Database
  const togglePaymentStatus = async (id) => {
    const subscription = subscriptions.find(sub => sub.id === id);
    const updatedStatus = !subscription.isPaymentOk;

    try {
      await fetch(`http://localhost:5281/api/subscriptions/update-payment-status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPaymentOk: updatedStatus }),
      });

      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === id ? { ...sub, isPaymentOk: updatedStatus } : sub
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

  return (
    <div style={{ width: "85%", marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL SUBSCRIPTIONS</h2>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: '3%' }}>Id</th>
            <th>Username</th>
            <th>Membership Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Subscription Date</th>
            <th>Payment OK</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={subscription.id}>
              <td>{index + 1}</td>
              <td>{subscription.username}</td>
              <td>{subscription.membershipName}</td>
              <td>{subscription.duration} months</td>
              <td>${subscription.price}</td>
              <td>{new Date(subscription.subscriptionDate).toLocaleDateString()}</td>
              <td style={{ textAlign: 'center' }}>
                <Form.Check
                  type="checkbox"
                  checked={subscription.isPaymentOk}
                  onChange={() => togglePaymentStatus(subscription.id)}
                />
              </td>
              <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <Button variant='info' size="sm" onClick={() => handleShowMore(subscription)}>Show more</Button>
                <Button variant='danger' size="sm" onClick={() => handleDelete(subscription.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Show More Modal */}
      <Modal show={showMoreModal} onHide={() => setShowMoreModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subscription Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentSubscription && (
            <>
              <p><strong>Username:</strong> {currentSubscription.username}</p>
              <p><strong>Membership Name:</strong> {currentSubscription.membershipName}</p>
              <p><strong>Duration:</strong> {currentSubscription.duration} months</p>
              <p><strong>Price:</strong> ${currentSubscription.price}</p>
              <p><strong>Subscription Date:</strong> {new Date(currentSubscription.subscriptionDate).toLocaleDateString()}</p>
              <p>
                <strong>Payment OK:</strong>{' '}
                <Form.Check
                  type="checkbox"
                  checked={currentSubscription.isPaymentOk}
                  readOnly
                  style={{ marginLeft: "10px" }}
                />
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMoreModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubscriptionTable;
