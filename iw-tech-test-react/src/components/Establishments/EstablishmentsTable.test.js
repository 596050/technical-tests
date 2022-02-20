import { render } from '@testing-library/react';
import { fetcher } from '../utils';
import useSWR from 'swr';

import { EstablishmentsTable } from './EstablishmentsTable';

jest.mock('swr', () => jest.fn());

describe('<EstablishmentsTable/>', () => {
  it('renders', () => {
    useSWR.mockImplementation(() => ({
      data: {
        establishments: [
          {
            BusinessName: 'Test Business Name',
            RatingValue: 'Test Rating Value',
          },
        ],
      },
      error: null,
    }));

    const { getByText } = render(<EstablishmentsTable pageNumber={1} />);

    expect(useSWR).toHaveBeenCalledWith(
      'https://api.ratings.food.gov.uk/Establishments/basic/1/10',
      fetcher,
    );
    expect(getByText('Business Name')).toBeInTheDocument();
    expect(getByText('Rating Value')).toBeInTheDocument();
  });
});
