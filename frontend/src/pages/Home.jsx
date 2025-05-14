import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added this

const Home = () => {
  const [memberships, setMemberships] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Added this

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await fetch("http://localhost:5281/api/memberships/all");
        const data = await res.json();
        setMemberships(data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };

    fetchMemberships();
  }, []);

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter your username.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5281/api/subscriptions/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          membershipId: selectedPlan.id,
        }),
      });

      if (res.ok) {
        alert("Subscription successful! ");
        navigate("/m"); //  navigate properly
        setSelectedPlan(null);
        setUsername("");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "50px 20px",
      background: "#f8f9fa",
      minHeight: "100vh",
      textAlign: "center",
    },
    title: {
      fontSize: "2.8rem",
      marginBottom: "40px",
      color: "#343a40",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "30px",
      justifyContent: "center",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      width: "280px",
      transition: "transform 0.3s, box-shadow 0.3s", // smooth hover
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "1.8rem",
      color: "#007bff",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "1.1rem",
      marginBottom: "8px",
      color: "#495057",
    },
    price: {
      fontWeight: "bold",
      color: "#28a745",
    },
    button: {
      marginTop: "15px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    formContainer: {
      marginTop: "60px",
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      margin: "60px auto 0",
      textAlign: "center",
    },
    formTitle: {
      fontSize: "2rem",
      marginBottom: "25px",
      color: "#343a40",
    },
    formGroup: {
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1px solid #ced4da",
    },
    submitButton: {
      width: "100%",
      padding: "12px",
      fontSize: "1.2rem",
      backgroundColor: "#28a745",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Our Membership Plans</h2>
      <div style={styles.grid}>
        {memberships.map((plan) => (
          <div
            key={plan.id}
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3 style={styles.cardTitle}>{plan.name}</h3>
            <p style={styles.cardText}>
              <strong>Duration:</strong> {plan.duration}
            </p>
            <p style={styles.cardText}>
              <strong>Price:</strong> <span style={styles.price}>${plan.price}</span>
            </p>
            <p style={styles.cardText}>
              
              <strong>Benefits:</strong> {plan.benefits}
            </p>
            <button
              style={styles.button}
              onClick={() => handleSubscribeClick(plan)}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      {/* Subscription Form */}
      {selectedPlan && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Subscribe to {selectedPlan.name}</h2>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.formGroup}>
              <input
                type="text"
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <button type="submit" style={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Subscription"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
