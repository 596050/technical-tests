import React from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
  margin: '0 5px',
};

export const EstablishmentsTableNavigation = ({
  pageNumber,
  onPreviousPage,
  onNextPage,
  canGetNextPage,
}) => (
  <nav>
    {
      <button
        type="button"
        style={buttonStyle}
        disabled={pageNumber <= 1}
        onClick={onPreviousPage}
      >
        -
      </button>
    }
    {pageNumber}
    {
      <button
        type="button"
        style={buttonStyle}
        disabled={!canGetNextPage}
        onClick={onNextPage}
      >
        +
      </button>
    }
  </nav>
);

EstablishmentsTableNavigation.propTypes = {
  pageNumber: PropTypes.number,
  pageCount: PropTypes.number,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func,
};
