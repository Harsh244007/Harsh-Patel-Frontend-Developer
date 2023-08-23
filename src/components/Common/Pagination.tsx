import React from "react";
import { PaginationProps } from "../../configs/types/Types";
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-center my-4">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default React.memo(Pagination);
