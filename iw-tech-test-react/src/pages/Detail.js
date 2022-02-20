import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  info: {
    color: 'white',
  },
};

export const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const establishment = location.state.establishment;

  return (
    <div>
      <div>
        <div style={style.info}>Address: {establishment?.RatingValue}</div>
        <div style={style.info}>Rating: {establishment?.RatingValue}</div>
        <div style={style.info}>
          Date of Inspection:{' '}
          {new Date(establishment?.RatingDate).toLocaleDateString('en-GB', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </div>
      </div>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};
