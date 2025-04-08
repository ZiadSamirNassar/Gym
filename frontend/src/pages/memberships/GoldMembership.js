import React from 'react';
import MembershipDetails from '../../components/MembershipDetails';
import Membershipdata from '../../data/MembershipData';

const GoldMembership = () => {
  const membership = Membershipdata.find(m => m.type === 'gold');
  return <MembershipDetails membership={membership} />;
};

export default GoldMembership;