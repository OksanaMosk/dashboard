import React, { useState } from 'react';
import { CustomerElement } from '../CarElement/CarElement';
import css from './CarList.module.css';

import customerData from '../../json/customers';

console.log(customerData);

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

  return (
    <div className={css.homeContainer}>
      <form>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#7E7E7E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="#7E7E7E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>

      <h2>All Customers</h2>
      <h3 onClick={toggleShowOnlyActive}>
        {showOnlyActive ? 'All Members' : 'Active Members'}
      </h3>

      <table className={css.homeTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
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

      <ul className={css.pagination}>
        <li>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={i + 1 === currentPage ? css.active : ''}>
            <button onClick={() => paginate(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};
