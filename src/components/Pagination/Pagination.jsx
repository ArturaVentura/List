import React from "react";
import styles from "./styles.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPaginationButtons = () => {
      const pageNumbers = [];
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pageNumbers.push(i);
          }
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        } else if (currentPage > totalPages - 4) {
          pageNumbers.push(1);
          pageNumbers.push("...");
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          pageNumbers.push(1);
          pageNumbers.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pageNumbers.push(i);
          }
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      }
      return (
        <>
          {currentPage > 1 && (
            <button onClick={() => onPageChange(currentPage - 1)}>
              &laquo;
            </button>
          )}
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={index} className={styles.ellipsis}>
                {pageNumber}
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(pageNumber)}
                className={currentPage === pageNumber ? styles.active : ""}
              >
                {pageNumber}
              </button>
            )
          )}
          {currentPage < totalPages && (
            <button onClick={() => onPageChange(currentPage + 1)}>
              &raquo;
            </button>
          )}
        </>
      );
    };
  
    return <div className={styles.pagination}>{renderPaginationButtons()}</div>;
  };
  
  export default Pagination;