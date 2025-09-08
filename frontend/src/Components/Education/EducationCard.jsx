import React from "react";

export const EducationCard = ({ institute, degree, year, cgpa, percentage, onRemove }) => {
  return (
    <div
      className="p-3 md:p-6 flex flex-col w-full sm:w-72 md:w-80 bg-[#1e293b] 
                 rounded-2xl h-full 
                 shadow-[0_0_20px_#38bdf8,0_10px_25px_#38bdf8]"
    >
      <div className="flex flex-col flex-1 justify-between min-h-[200px]">
        <div>
          <h3 className="px-2 md:px-4 text-xl md:text-2xl font-bold leading-normal text-[#38bdf8]">
            {degree}
          </h3>
          <p className="px-2 md:px-4 text-sm md:text-md text-gray-300 py-2">{institute}</p>
          <p className="px-2 md:px-4 text-sm text-gray-400">{year}</p>
        </div>

        <div className="mt-4 px-2 md:px-4 text-gray-300 text-sm md:text-md">
          <div className="flex justify-between items-center mb-2">
            <span>CGPA: {cgpa}</span>
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
              title="Remove"
            >
              ✕
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Percentage: {percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
