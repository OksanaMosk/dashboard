import React from 'react';
import css from './CarElement.module.css';

export const CustomerElement = ({
  id,
  Name,
  Company,
  Phone,
  Email,
  Country,
  Status,
}) => {
  return (
    <li className={css.customer} key={id}>
      <p>{Name}</p>
      <p>{Company}</p> <p>{Phone}</p>
      <p>{Email}</p>
      <p>{Country}</p>
      <p>{Status}</p>
    </li>
  );
};
