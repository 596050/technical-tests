import React from 'react';
import App from './App';
import { render, within, fireEvent } from '@testing-library/react';

import { fetcher } from './utils';
import useSWR from 'swr';
import establishmentsMock from './mock/validEstablishments.json';

jest.mock('swr', () => jest.fn());

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const response = {
  data: {
    establishments: establishmentsMock,
  },
  error: null,
};
describe('integration tests', () => {
  it('renders table with data', () => {
    useSWR.mockImplementation(() => response);

    const { getByText, getByTestId } = render(<App />);

    expect(useSWR).toHaveBeenCalledWith(
      'https://api.ratings.food.gov.uk/Establishments/basic/1/10',
      fetcher,
    );
    expect(getByText('Business Name')).toBeInTheDocument();
    expect(getByText('Rating Value')).toBeInTheDocument();
    expect(
      within(getByTestId('table-body')).queryAllByTestId(
        'establishments-table-row',
      ).length,
    ).toBe(response.data.establishments.length);
    response.data.establishments.forEach(establishment => {
      expect(
        within(getByTestId('table-body')).queryByText(
          establishment.BusinessName,
        ),
      ).toBeInTheDocument();
    });
  });

  it('filters table with dropdown', () => {
    useSWR.mockImplementation(() => response);
    const filterOptionText = 'Other catering premises';

    const { getByTestId, getAllByTestId } = render(<App />);

    fireEvent.change(getByTestId('establishments-filter'), {
      target: { value: filterOptionText },
    });

    expect(getByTestId('establishments-filter'));
    let options = getAllByTestId('establishments-filter-option');
    const filteredOption = options.find(
      option => option.textContent === filterOptionText,
    );

    // expected option filtered option is selected
    expect(filteredOption.selected).toBeTruthy();

    const filteredData = response.data.establishments.filter(establishment => {
      return establishment.BusinessType === filterOptionText;
    });

    // expected number of rows in table equal to filtered data
    expect(
      within(getByTestId('table-body')).queryAllByTestId(
        'establishments-table-row',
      ).length,
    ).toBe(filteredData.length);

    filteredData.forEach(establishment => {
      expect(
        within(getByTestId('table-body')).queryByText(
          establishment.BusinessName,
        ),
      ).toBeInTheDocument();
    });
  });
});
