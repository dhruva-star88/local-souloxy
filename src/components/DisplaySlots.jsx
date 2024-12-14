import React from 'react';

const DisplaySlots = ({ availableSlots, deleteSlot, calculateDuration }) => {
  return (
    <div className="mt-8">
      <h3 className="font-semibold text-green-800 mb-4">Your Selected Availability</h3>
      <div
        className="space-y-2 p-2 bg-gray-50 border rounded-lg shadow-inner"
        style={{ maxHeight: '200px', overflowY: 'auto' }} // Add scrolling
      >
        {availableSlots.length > 0 ? (
          <ul className="space-y-2">
            {availableSlots.map((slot, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-lg shadow-md flex justify-between"
              >
                <div>
                  {slot.start.toLocaleDateString()} -{' '}
                  {slot.start.toLocaleTimeString()} to {slot.end.toLocaleTimeString()}
                  <span className="ml-2 text-sm text-gray-600">
                    ({calculateDuration(slot.start, slot.end)})
                  </span>
                </div>
                <button
                  onClick={() => deleteSlot(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No slots available.</p>
        )}
      </div>
    </div>
  );
};

export default DisplaySlots;
