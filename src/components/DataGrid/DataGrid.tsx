// src/components/DataGrid.tsx
import React from "react";
import {
  selectSpaceXData,
  selectSpaceXLoading,
} from "../../configs/store/spaceXSlice";
import { Capsule } from "../../configs/types/Types";
import { useSelector } from "react-redux";
import Loading from "../Common/Loading";
import DataGridItem from "./DataGridItem";
import Pagination from "../Common/Pagination";
import { useState } from "react";

const DataGrid: React.FC = () => {
  const spaceXData = useSelector(selectSpaceXData);
  const isLoading = useSelector(selectSpaceXLoading);
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(spaceXData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spaceXData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-4">
      {spaceXData && !isLoading && spaceXData.length !== 0 ? (
        <div className="flex flex-col justify-center items-center gap-20 max-w-auto">
          <div className="flex flex-wrap justify-center items-center gap-20 max-w-auto">
            {currentItems.map((item: Capsule, index: number) => {
              return <DataGridItem key={index} item={item} />;
            })}
          </div>
          {spaceXData.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      ) : spaceXData.length === 0 && !isLoading ? (
        <p>Oops There's some Error Please try again later</p>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DataGrid;
