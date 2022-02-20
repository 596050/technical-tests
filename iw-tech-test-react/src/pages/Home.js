import React from 'react';

import { PaginatedEstablishmentsTable } from '../components/Establishments/PaginatedEstablishmentsTable';
import Background from '../static/logo.svg';

const logoStyle = {
  width: '640px',
  height: '25px',
  background: `transparent url(${Background}) no-repeat center`,
  margin: '20px auto',
};

export const Home = () => (
  <div>
    <header style={logoStyle} />
    <PaginatedEstablishmentsTable />
  </div>
);
