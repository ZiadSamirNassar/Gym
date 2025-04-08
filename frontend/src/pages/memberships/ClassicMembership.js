import React from 'react';
import MembershipDetails from '../../components/MembershipDetails';
import Membershipdata from '../../data/MembershipData';

const ClassicMembership = () => {
  const membership = Membershipdata.find(m => m.type === 'classic');
  return <MembershipDetails membership={membership} />;
};

export default ClassicMembership;