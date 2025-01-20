import React from "react";

function SideLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-70">
      <div className="flex items-center justify-center space-x-3">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 border-solid"></div>
        <span className="text-white text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
}

export default SideLoader;
