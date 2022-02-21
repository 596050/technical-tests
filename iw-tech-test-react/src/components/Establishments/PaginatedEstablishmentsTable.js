import React, { useState } from 'react';
import { EstablishmentsTable } from './EstablishmentsTable';
import { EstablishmentsTableNavigation } from './EstablishmentsTableNavigation';
import { useEstablishments } from './useEstablishments';
import {
  EstablishmentsFilter,
  useEstablishmentsFilter,
} from '../EstablishmentsFilter';

const tableStyle = {
  background: 'rgba(51, 51, 51, 0.9)',
  padding: '10px',
  width: 'max-content',
  marginLeft: '50px',
  color: 'white',
};

export const PaginatedEstablishmentsTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageCount = 100;

  const { error, establishments, isLoading } = useEstablishments({
    pageNumber,
  });
  const { handleFilterChange, options, handleFilterEstablishments } =
    useEstablishmentsFilter({
      establishments,
      filterOn: 'BusinessType',
    });

  function handlePreviousPage() {
    pageNumber > 1 && setPageNumber(pageNumber - 1);
  }

  function handleNextPage() {
    pageNumber < pageCount && setPageNumber(pageNumber + 1);
  }

  const filtered = handleFilterEstablishments(establishments);

  return (
    <div style={tableStyle}>
      <h2>Food Hygiene Ratings</h2>
      <EstablishmentsFilter
        onChange={handleFilterChange}
        options={options}
        label="Filter on Business Type"
        defaultValue="All"
        isLoading={isLoading}
      />
      <EstablishmentsTable
        pageNumber={pageNumber}
        establishments={filtered}
        error={error}
        isLoading={isLoading}
      />
      <EstablishmentsTableNavigation
        pageNumber={pageNumber}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        canGetNextPage={!isLoading && pageNumber < pageCount}
      />
    </div>
  );
};
