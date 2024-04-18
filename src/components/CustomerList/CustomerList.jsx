import React, { useState } from 'react';
import { CustomerElement } from '../CustomerElement/CustomerElement';
import customerData from '../../json/customers';

import css from './CustomerList.module.css';

export const CarList = () => {
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleShowOnlyActive = () => {
    setShowOnlyActive(prevState => !prevState);
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredData = customerData.filter(customer =>
    Object.values(customer).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredCustomerData = showOnlyActive
    ? filteredData.filter(customer => customer.Status === 'Active')
    : filteredData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomerData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredCustomerData.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    const maxButtonsToShow = 4;

    let startPage;
    let endPage;

    if (totalPages <= maxButtonsToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.ceil(maxButtonsToShow / 2)) {
      startPage = 1;
      endPage = maxButtonsToShow;
    } else if (currentPage + Math.floor(maxButtonsToShow / 2) >= totalPages) {
      startPage = totalPages - maxButtonsToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxButtonsToShow / 2 - 1);
      endPage = currentPage + Math.ceil(maxButtonsToShow / 2) - 1;
    }

    if (startPage > 1) {
      pageButtons.push(
        <li key={1}>
          <button onClick={() => paginate(1)}>1</button>
        </li>
      );
      if (startPage > 2) {
        pageButtons.push(<li key="dots-start">...</li>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <li
          key={i}
          className={`${css.pageNumber} ${i === currentPage ? css.active : ''}`}
        >
          <button onClick={() => paginate(i)}>{i}</button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<li key="dots-end">...</li>);
      }
      pageButtons.push(
        <li key={totalPages}>
          <button onClick={() => paginate(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pageButtons;
  };

  return (
    <div className={css.homeContainer}>
      <h2 className={css.titleAllCustomers}>All Customers</h2>
      <h3 className={css.titleMembers} onClick={toggleShowOnlyActive}>
        {showOnlyActive ? 'All Members' : 'Active Members'}
      </h3>
      <form className={css.form}>
        <svg
          className={css.searchSvg}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          className={css.input}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
      <table className={css.homeTable}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Company</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="6">Customers not found</td>
            </tr>
          ) : (
            currentItems.map(customer => (
              <CustomerElement key={customer.id} {...customer} />
            ))
          )}
        </tbody>
      </table>
      <div className={css.paginationAbout}>
        <p className={css.about}>
          Showing data {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredCustomerData.length)} of{' '}
          {filteredCustomerData.length} entries
        </p>
        <ul className={css.pagination}>
          <li>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <svg
                className={css.paginationSvg}
                width="5"
                height="7"
                viewBox="0 0 5 7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.936 6.392L0.176 3.668L2.936 0.944H4.664L1.892 3.668L4.664 6.392H2.936Z" />
              </svg>
            </button>
          </li>
          {renderPageButtons()}
          <li>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <svg
                className={css.paginationSvg}
                width="5"
                height="7"
                viewBox="0 0 5 7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.344 0.944H2.072L4.832 3.668L2.072 6.392H0.344L3.116 3.668L0.344 0.944Z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
