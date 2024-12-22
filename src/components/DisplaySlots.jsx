import React from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify'; 

const DisplaySlots = ({ availableSlots, deleteSlot, calculateDuration }) => {
  console.log(availableSlots)
  const handleDeleteSlot = (index) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      // Delete the slot if confirmed
      deleteSlot(index);
      toast.success('Slot deleted successfully!');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-semibold text-green-800 mb-4">Your Selected Availability</h3>
      <div
        className="space-y-2 p-2 bg-gray-50 border rounded-lg shadow-inner"
        style={{ maxHeight: '200px', overflowY: 'auto' }}
      >
         
        {availableSlots.length > 0 ? (
         
          <ul className="space-y-2">
            {availableSlots.map((slot, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-lg shadow-md flex justify-between"
              >
                <div>
                  {format(slot.start, 'yyyy-MM-dd')} - {format(slot.start, 'hh:mm a')} to{' '}
                  {format(slot.end, 'hh:mm a')}
                  <span className="ml-2 text-sm text-gray-600">
                    ({calculateDuration(slot.start, slot.end)} minutes)
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteSlot(index)} 
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
