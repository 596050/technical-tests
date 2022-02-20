import { useEffect, useState } from 'react';

const defaultFilter = {
  label: 'All',
  value: 'All',
};

const dedupe = (array, key) => {
  const seen = new Set();
  return array.filter(item => {
    const k = item[key];
    return seen.has(k) ? false : seen.add(k);
  });
};

const makeOptions = ({ establishments, dedupeKey, transformFn }) => {
  return dedupe(establishments, dedupeKey)?.map(transformFn);
};

export const useEstablishmentsFilter = ({
  establishments,
  filterOn,
  defaultOptions = defaultFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultOptions);
  const [filterState, setFilterState] = useState({
    options: [defaultOptions],
  });

  useEffect(() => {
    if (establishments?.length) {
      const options = makeOptions({
        establishments,
        dedupeKey: filterOn,
        transformFn: item => ({
          value: item.BusinessType,
          label: item.BusinessType,
        }),
      });

      options.unshift(defaultOptions);

      if (
        options.findIndex(option => option.value === selectedFilter.value) ===
        -1
      ) {
        resetFilter();
      }

      setFilterState({
        options: options,
      });
    }
  }, [establishments]);

  function handleFilterChange(event) {
    setSelectedFilter({
      value: event.target.value,
      key: filterOn,
    });
  }

  function resetFilter() {
    setSelectedFilter(defaultOptions);
  }

  function handleFilterEstablishments(establishments) {
    return !selectedFilter?.value ||
      selectedFilter?.value !== defaultOptions.value
      ? establishments?.filter(establishment => {
          return establishment?.[filterOn] === selectedFilter?.value;
        })
      : establishments;
  }

  return {
    handleFilterChange,
    options: filterState?.options,
    handleFilterEstablishments,
  };
};
