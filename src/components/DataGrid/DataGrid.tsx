import React, { useMemo, useState, useCallback } from "react";
import {
  selectSpaceXData,
  selectSpaceXLoading,
} from "../../configs/store/spaceXSlice";
import { Capsule } from "../../configs/types/Types";
import { useSelector } from "react-redux";
import Loading from "../Common/Loading";
import DataGridItem from "./DataGridItem";
import Pagination from "../Common/Pagination";

const DataGrid: React.FC = () => {
  const spaceXData = useSelector(selectSpaceXData);
  const isLoading = useSelector(selectSpaceXLoading);
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(spaceXData.length / itemsPerPage), [spaceXData.length, itemsPerPage]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => spaceXData.slice(indexOfFirstItem, indexOfLastItem), [spaceXData, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="bg-white p-4">
      {useMemo(() => {
        if (spaceXData.length === 0 && !isLoading) {
          return <p>Oops There's some Error Please try again later</p>;
        } else if (!isLoading) {
          return (
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
          );
        } else {
          return <Loading />;
        }
      }, [spaceXData, isLoading, currentItems, totalPages, currentPage, handlePageChange, itemsPerPage])}
    </div>
  );
};

export default React.memo(DataGrid);
