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
    <tr className={css.customer} key={id}>
      <td>{Name}</td>
      <td>{Company}</td>
      <td>{Phone}</td>
      <td>{Email}</td>
      <td>{Country}</td>
      <td>
        <span className={Status === 'Active' ? css.active : css.inactive}>
          {Status === 'Active' ? (
            <a
              href={`mailto:${Email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Status}
            </a>
          ) : (
            Status
          )}
        </span>
      </td>
    </tr>
  );
};
