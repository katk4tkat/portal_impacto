// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination">
        {Array(totalPages)
          .fill(0)
          .map((_, i) => (
            <li
              key={i}
              className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
