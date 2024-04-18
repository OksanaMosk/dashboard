import React, { useState } from 'react';

import { CarList } from 'components/CustomerList/CustomerList';

import css from './CustomersPage.module.css';

const CustomersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={css.pageContainer}>
      <h1 className={css.customersTitle}>Hello Evano 👋🏼,</h1>
      <CarList currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default CustomersPage;
