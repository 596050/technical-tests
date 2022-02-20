import React from "react";
import PropTypes from "prop-types";

const buttonStyle = {
  margin: "0 5px",
};

export const EstablishmentsTableNavigation = ({
  pageNumber,
  pageCount,
  onPreviousPage,
  onNextPage,
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
        disabled={pageNumber >= pageCount}
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
