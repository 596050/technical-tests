import useSWR from 'swr';
import { fetcher } from '../../utils';

export const useEstablishments = ({ pageNumber }) => {
  const url = `https://api.ratings.food.gov.uk/Establishments/basic/${pageNumber}/10`;
  const { data, error } = useSWR(url, fetcher);
  const { establishments } = data || {};

  return {
    error,
    establishments,
    isLoading: !data && !error,
  };
};
