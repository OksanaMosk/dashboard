import React from 'react';
import { CustomerElement } from '../CarElement/CarElement';
import css from './CarList.module.css';

import customerData from '../../json/customers';

console.log(customerData);
export const CarList = () => {
  return (
    <div className={css.homeContainer}>
      <ul className={css.homeList}>
        {customerData.map(customer => (
          <CustomerElement key={customer.id} {...customer} />
        ))}
      </ul>
    </div>
  );
};
