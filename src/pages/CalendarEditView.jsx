import React, { useState, useEffect } from 'react';
import { format, addMinutes, isBefore, endOfDay, set, startOfDay, isToday, isPast } from 'date-fns';
import CalendarChild from  '../components/Calender';
import DisplaySlots from '../components/DisplaySlots';
import { toast } from 'react-toastify';
import '../calendar.css'

const EditingSlots = () => {
  const [minuteSwitch, setMinuteSwitch] = useState(0);
  const [batchDuration, setBatchDuration] = useState(30);
  // To generate the timeslots in "Available time slots"
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  // Function to fetch
  const fetchSlots = async () => {
    try {
      const res = await fetch('http://localhost:8000/appointments');
      const data = await res.json();

      const formattedSlots = data.map((slot) => ({
        id: slot.id,
        start: new Date(slot.startTime),
        end: new Date(slot.endTime),
        title: 'Available Slot',
      }));

      console.log("Formatted Slots", formattedSlots)

      /*const convertToIST = (isoDateString) => {
        const date = new Date(isoDateString);
        const timeZoneOffset = 5.5 * 60; // IST offset in minutes (5 hours 30 minutes)
        return new Date(date.getTime() + timeZoneOffset * 60 * 1000);
      };*/

      setAvailableSlots(formattedSlots);
      console.log("Available Slots: ",availableSlots)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 // Using Fetching here 
  useEffect(() => {
    fetchSlots();
  }, []);

  const handleMinuteSwitchChange = (e) => {
    setMinuteSwitch(parseInt(e.target.value, 10));
  };

  const handleBatchDurationChange = (e) => {
    setBatchDuration(parseInt(e.target.value, 10));
  };

  // Generating time slots in the "Available time slots" Section
  const generateTimeSlots = () => {
    const currentDate = selectedDate // Use selectedDate instead of current date
    const currentTime = new Date() // Get current time



    let adjustedStartTime = isToday(currentDate) //returns boolean
      ? set(currentTime, { minutes: minuteSwitch, seconds: 0, milliseconds: 0 }) //if its current date its execute
      : set(startOfDay(currentDate), { minutes: minuteSwitch, seconds: 0, milliseconds: 0 }); // if its not current date then it sets the date 

    const endTimeOfDay = endOfDay(currentDate);
    let slots = [];

    while (isBefore(adjustedStartTime, endTimeOfDay)) {
      const endTime = addMinutes(adjustedStartTime, batchDuration);

      // Check for overlaps
    const overlaps = availableSlots.some((slot) =>
      (adjustedStartTime < slot.end && endTime > slot.start) // Overlap condition
    );

    if (!overlaps) {
      slots.push({
        start: new Date(adjustedStartTime),
        end: new Date(endTime),
        label: `${format(adjustedStartTime, 'hh:mm a')} - ${format(endTime, 'hh:mm a')}`,
      });
    }

    adjustedStartTime = addMinutes(adjustedStartTime, batchDuration);
  }

    setTimeSlots(slots);
  };
  // Generate time slost execute everytime minute and batch duration changes
  useEffect(() => {
    generateTimeSlots();
  }, [minuteSwitch, batchDuration, availableSlots, selectedDate]);

  // Function that handles slot selection
  const handleSlotSelection = async (slot) => {
    // Prevent slots selecting from past dates
    if(isPast(slot.start)){
      toast.error("Cannot select slots from past dates.");
      return;
    }
    const newSlot = {
      startTime: slot.start.toISOString(), // converts date to String form
      endTime: slot.end.toISOString(), // converts date to String form
    };

    try {
      const res = await fetch('http://localhost:8000/appointments',  {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlot), // converts the object into JSON String
      });

      if (res.ok) {
        const addedSlot = await res.json();
        setAvailableSlots((prev) => [
          ...prev,
          { id: addedSlot.id, start: new Date(addedSlot.startTime), end: new Date(addedSlot.endTime), title: 'Available Slot' },
        ]);

        // Remove selected slot from available slots
        setTimeSlots((prev) => prev.filter((ts) => ts.start !== slot.start))

        toast.success('Slot Added Successfully');
      } else {
        throw new Error('Failed to save slot');
      }
    } catch (error) {
      console.error('Error Saving Slot:', error);
      toast.error('Failed to Add Slot');
    }
  };

  const handleDeleteSlot = async (index) => {
    const slotToDelete = availableSlots[index];
    try {
      const res = await fetch(`http://localhost:8000/appointments/${slotToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAvailableSlots((prev) => prev.filter((_, i) => i !== index));
        toast.success('Slot Deleted Successfully');
      } else {
        throw new Error('Failed to delete slot');
      }
    } catch (error) {
      console.error('Error Deleting Slot:', error);
      toast.error('Failed to Delete Slot');
    }
  };

  return (
    <div className="flex p-6 space-x-6">
      <CalendarChild
        availableSlots={availableSlots}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        setDate={setSelectedDate}
      />

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
                    className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-600"
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
          availableSlots={availableSlots}
          deleteSlot={handleDeleteSlot}
        />
      </div>
    </div>
  );
};

export default EditingSlots;
