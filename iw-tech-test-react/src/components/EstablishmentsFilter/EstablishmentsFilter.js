import React from 'react';

const labelStyle = {
  paddingRight: '10px',
};

const selectStyle = {
  height: '25px',
};

export const EstablishmentsFilter = ({
  onChange,
  options,
  defaultValue,
  label,
  isLoading,
}) => {
  return (
    <>
      <label style={labelStyle} htmlFor="establishments-filter">
        {label}
      </label>
      <select
        id="establishments-filter"
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={options.length <= 1 || isLoading}
        style={selectStyle}
      >
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
