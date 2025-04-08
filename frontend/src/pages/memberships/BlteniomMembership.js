import React from 'react';
import MembershipDetails from '../../components/MembershipDetails';
import Membershipdata from '../../data/MembershipData';

const BlateniomMembership = () => {
  const membership = Membershipdata.find(m => m.type === 'blateniom');
  return <MembershipDetails membership={membership} />;
};

export default BlateniomMembership;