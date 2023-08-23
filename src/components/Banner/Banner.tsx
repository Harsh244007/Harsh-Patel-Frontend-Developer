import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="bg-blue-500 p-4 text-white">
      <h1 className="text-2xl font-semibold">SpaceX Rockets & Capsules</h1>
      <p>Welcome to our SpaceX data visualization page.</p>
    </div>
  );
};

export default React.memo(Banner);
