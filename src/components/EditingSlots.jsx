import React from 'react';
import { format } from 'date-fns';
import DisplaySlots from './DisplaySlots';

const EditingSlots = ({ slotDetails, handleInputChange, saveSlot, availableSlots, deleteSlot, calculateDuration }) => {
  return (
    <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-2xl font-bold mb-4 text-green-800">Edit Slot Timing</h3>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Start Time:</label>
        <input
          type="datetime-local"
          name="start"
          value={slotDetails.start ? format(slotDetails.start, "yyyy-MM-dd'T'HH:mm") : ''}
          onChange={handleInputChange}
          step="900"
          className="w-full p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 transition-all"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">End Time:</label>
        <input
          type="datetime-local"
          name="end"
          value={slotDetails.end ? format(slotDetails.end, "yyyy-MM-dd'T'HH:mm") : ''}
          onChange={handleInputChange}
          step="900"
          className="w-full p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 transition-all"
        />
      </div>
      <button
        onClick={saveSlot}
        className="w-full px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600 transition-all"
      >
        Save Slot
      </button>

      <DisplaySlots
        availableSlots={availableSlots}
        deleteSlot={deleteSlot}
        calculateDuration={calculateDuration}
      />
    </div>
  );
};

export default EditingSlots;
