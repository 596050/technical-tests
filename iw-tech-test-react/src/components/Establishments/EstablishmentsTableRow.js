import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const tableCellStyle = {
  fontSize: '20px',
};

export const EstablishmentsTableRow = ({ establishment }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail', {
      state: { establishment },
    });
  };

  return (
    <tr
      tabIndex="0"
      style={{
        cursor: 'pointer',
      }}
      className="establishments-table-row"
      onClick={handleClick}
    >
      <td style={tableCellStyle}>{establishment.BusinessName}</td>
      <td style={tableCellStyle}>{establishment.RatingValue}</td>
    </tr>
  );
};

EstablishmentsTableRow.propTypes = {
  establishment: PropTypes.shape({
    BusinessName: PropTypes.string,
    RatingValue: PropTypes.string,
  }),
};
