import React from 'react';

const calculateDuration = (start, end) => {
  // Calculate duration in minutes
  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationInMs = endTime - startTime;
  return durationInMs / 60000; // Convert from milliseconds to minutes
};


const DisplaySlots = ({ availableSlots, deleteSlot }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-green-800">Existing Slots</h3>
      <ul className="max-h-48 overflow-y-auto border p-2 rounded-lg ">
        {availableSlots.map((slot, index) => {
          const duration = calculateDuration(slot.start, slot.end);
          return (
            <li key={index} className="flex justify-between items-center mt-2">
              <div>
                <span className="font-medium text-gray-700">
                  
                  {`${slot.start.toISOString().split("T")[0]} - ${slot.start.toLocaleTimeString()} to ${slot.end.toLocaleTimeString()}`}
    
                </span>
                <span className="ml-2 text-gray-500">({duration} mins)</span>
              </div>
              <button
                onClick={() => deleteSlot(index)}
                className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplaySlots;
