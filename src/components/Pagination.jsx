import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let start = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let end = start + maxPagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center mr-7 mt-2">
      <p className="text-sm text-light-grey">
        Showing the results {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-3">
        {/* First */}
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
        >
          <GoArrowLeft />
        </button>

        {/* Previous */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-2 py-1 rounded-md text-sm ${
              currentPage === page
                ? "bg-dark-yellow text-white bg-black font-semibold"
                : "text-dark-yellow"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }
        >
          Next
        </button>

        {/* Last */}
        <button
          onClick={() => paginate(totalPages)}
         disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;