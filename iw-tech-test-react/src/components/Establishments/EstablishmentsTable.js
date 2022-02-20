import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { EstablishmentsTableRow } from './EstablishmentsTableRow';

const headerStyle = {
  paddingBottom: '10px',
  textAlign: 'left',
  fontSize: '20px',
};

const loadingStyle = {
  padding: '20px',
  textAlign: 'center',
};

const TablePlaceholder = ({ text = 'Loading...' }) => {
  return (
    <tr>
      <td colSpan="2" style={loadingStyle}>
        {text}
      </td>
    </tr>
  );
};

export const EstablishmentsTable = memo(
  ({ isLoading, establishments, error }) => {
    const tableRows = isLoading ? (
      <TablePlaceholder />
    ) : (
      establishments?.map((establishment, index) => {
        return (
          <EstablishmentsTableRow
            key={establishment.FHRSID}
            establishment={establishment}
          />
        );
      })
    );

    if (error) return <div>Error: {error}</div>;
    return (
      <table>
        <tbody>
          <tr>
            <th style={headerStyle}>Business Name</th>
            <th style={headerStyle}>Rating Value</th>
          </tr>
          {tableRows}
        </tbody>
      </table>
    );
  },
);

EstablishmentsTable.displayName = 'EstablishmentsTable';
