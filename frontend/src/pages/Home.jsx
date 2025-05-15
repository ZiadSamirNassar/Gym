import React, { useState, useEffect } from 'react';
import Topimg from '../shared/Topimg';
import SubscriptionCard from '../components/SubscriptionCard';

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://localhost:7052/MembershipPlan');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setPlans(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Topimg />

      <section className="cardsContainer" style={{ display: 'flex', justifyContent: 'space-evenly', margin: '25px', flexWrap: 'wrap' }}>
        {plans.map((plan) => (
          <SubscriptionCard 
            key={plan.id}
            title={plan.name}
            price={plan.price}
            duration={plan.duration}
            benefits={plan.benefits}
            personalSessions={plan.personalSessions}
          />
        ))}
      </section>
    </>
  );
}

export default Home;