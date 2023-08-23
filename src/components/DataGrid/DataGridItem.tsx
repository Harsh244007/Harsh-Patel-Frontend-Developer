import React, { useState } from "react";
import { DataGridItemProps, Mission } from "../../configs/types/Types";
import Modal from "../Common/Modal";

interface OptionTypes {
  year: string;
  month: string;
  day: string;
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getStatusClass = (status: string) => {
  if (status === "unknown") return "text-red-600";
  if (status === "active") return "text-green-600";
  return "line-through text-gray-600";
};

const DataGridItem: React.FC<DataGridItemProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatDate = (dateString: string) => {
    const options: OptionTypes = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    {/* @ts-ignore  for vercel deployment*/}
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      key={item.capsule_serial} onClick={toggleModal}
      className="bg-gray-100 p-6 rounded-md shadow-md cursor-pointer"
    >
      <h2 className="text-lg font-semibold">
        {/* @ts-ignore  for vercel deployment*/}
        Capsule: {capitalizeFirstLetter(item && item.capsule_id)}
      </h2>
      {/* @ts-ignore  for vercel deployment*/}
      <p className={`text-gray-600 ${getStatusClass(item && item.status)}`}>
        Status: {item.status}
      </p>
      <p className="text-gray-600">
        {/* @ts-ignore  for vercel deployment*/}
        Original Launch: {formatDate(item.original_launch)}
      </p>
      <p className="text-gray-600">Type: {item.type}</p>
      <p className="text-gray-600">
        Mission Count : {item && item.missions && item.missions.length}
      </p>
      <button onClick={toggleModal} className="text-blue-500">
        View Details
      </button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <div className="modal-content bg-white p-4 rounded-md">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            >
              X
            </button>
            <h2 className="text-lg font-semibold">
              Capsule
              {item &&
                item.capsule_id &&
                item.capsule_id.charAt(0)?.toUpperCase() + item &&
                item.capsule_id &&
                item.capsule_id.slice(1)}{" "}
              Details
            </h2>{" "}
            <p
              className={`text-gray-600 ${
                item.status === "unknown"
                  ? "text-red-600"
                  : item.status === "active"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              Status: {item.status}
            </p>
            {/* @ts-ignore  for vercel deployment*/}
            <p>Original Launch: {formatDate(item.original_launch)}</p>
            <p>Type: {item.type}</p>
            <h3 className="mt-4 text-md font-semibold">
              Missions: {item && item.missions && item.missions.length - 1}
            </h3>
            <ul className="list-disc ml-6">
              {item &&
                item.missions &&
                item.missions.map((mission: Mission, index) => (
                  <li key={index}>
                    {mission.name} (Flight {mission.flight})
                  </li>
                ))}
            </ul>
            <p className="mt-4">{item.details}</p>
            <p className="mt-2">Landings: {item.landings}</p>
            <p>Reuse Count: {item.reuse_count}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default React.memo(DataGridItem);
