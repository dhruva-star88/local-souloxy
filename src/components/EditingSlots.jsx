import React, { useState, useEffect } from 'react';
import { format, addMinutes, isBefore, endOfDay, set, startOfDay, isToday } from 'date-fns';
import DisplaySlots from './DisplaySlots';

const EditingSlots = ({ slotDetails, saveSlot, deleteSlot, calculateDuration, updateCalendar }) => {
  const [minuteSwitch, setMinuteSwitch] = useState(0);
  const [batchDuration, setBatchDuration] = useState(30);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    generateTimeSlots();
  }, [minuteSwitch, batchDuration, slotDetails.start, selectedSlots]);

  const handleMinuteSwitchChange = (e) => {
    setMinuteSwitch(parseInt(e.target.value, 10));
  };

  const handleBatchDurationChange = (e) => {
    setBatchDuration(parseInt(e.target.value, 10));
  };

  const generateTimeSlots = () => {
    const startTime = slotDetails.start ? new Date(slotDetails.start) : new Date();
    let adjustedStartTime;

    if (isToday(startTime)) {
      adjustedStartTime = set(startTime, { minutes: minuteSwitch, seconds: 0, milliseconds: 0 });
    } else {
      adjustedStartTime = set(startOfDay(startTime), { minutes: minuteSwitch, seconds: 0, milliseconds: 0 });
    }

    const endTimeOfDay = endOfDay(startTime);

    let slots = [];
    let currentTime = adjustedStartTime;

    while (isBefore(currentTime, endTimeOfDay)) {
      const endTime = addMinutes(currentTime, batchDuration);
      if (isBefore(endTime, endTimeOfDay) || endTime.getTime() === endTimeOfDay.getTime()) {
        const isOverlapping = selectedSlots.some(slot =>
          (currentTime >= slot.start && currentTime < slot.end) ||
          (endTime > slot.start && endTime <= slot.end)
        );

        if (!isOverlapping) {
          slots.push({
            start: new Date(currentTime),
            end: new Date(endTime),
            label: `${format(currentTime, 'hh:mm a')} - ${format(endTime, 'hh:mm a')}`,
          });
        }
      }
      currentTime = addMinutes(currentTime, batchDuration);
    }

    setTimeSlots(slots);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlots(prevSelected => [...prevSelected, slot]);
    saveSlot({ start: slot.start, end: slot.end });
  };

  // Handle deleting a selected slot
  const handleDeleteSlot = (index) => {
    const newSelectedSlots = selectedSlots.filter((_, i) => i !== index);
    setSelectedSlots(newSelectedSlots);

    // Call updateCalendar function to update calendar after deletion
    updateCalendar(newSelectedSlots);
  };

  return (
    <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-2xl font-bold mb-4 text-green-800">Edit Slot Timing</h3>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Minute Switch:</label>
        <select
          value={minuteSwitch}
          onChange={handleMinuteSwitchChange}
          className="w-full p-2 border-2 rounded-lg focus:outline-none focus:border-green-500"
        >
          <option value={0}>00</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Batch Duration:</label>
        <select
          value={batchDuration}
          onChange={handleBatchDurationChange}
          className="w-full p-2 border-2 rounded-lg focus:outline-none focus:border-green-500"
        >
          <option value={30}>30 mins</option>
          <option value={60}>60 mins</option>
          <option value={90}>90 mins</option>
          <option value={120}>120 mins</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Available Time Slots:</label>
        <ul className="max-h-48 overflow-y-auto border p-2 rounded-lg">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{slot.label}</span>
                <button
                  onClick={() => handleSlotSelection(slot)}
                  className={`px-2 py-1 rounded transition-all ${selectedSlots.some(selected => selected.start.getTime() === slot.start.getTime()) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-400 text-white hover:bg-green-600'}`}
                  disabled={selectedSlots.some(selected => selected.start.getTime() === slot.start.getTime())}
                >
                  Select
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No available slots.</li>
          )}
        </ul>
      </div>

      <DisplaySlots
        availableSlots={selectedSlots} 
        deleteSlot={handleDeleteSlot}
        calculateDuration={calculateDuration}
      />
    </div>
  );
};

export default EditingSlots;
