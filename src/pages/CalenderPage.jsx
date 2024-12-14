import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore, startOfDay, differenceInMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpComingAppointments from '../components/UpComingAppoitments';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const CalendarPage = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [currentMonthHolidays, setCurrentMonthHolidays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [slotDetails, setSlotDetails] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: 'C2rzgHeUx8NcZnIzGMis2hDVuXXeYcYD',
            country: 'IN',
            year: new Date().getFullYear(),
          },
        });
        setHolidays(response.data.response.holidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };
    fetchHolidays();
  }, []);

  useEffect(() => {
    if (holidays.length > 0) {
      const filteredHolidays = holidays.filter((holiday) => {
        const holidayMonth = new Date(holiday.date.iso).getMonth();
        return holidayMonth === currentMonth;
      });
      setCurrentMonthHolidays(filteredHolidays);
    }
  }, [holidays, currentMonth]);

  const handleNavigate = (date) => {
    setCurrentMonth(date.getMonth());
  };
  
  const handleSelectSlot = (slotInfo) => {
    const currentDate = new Date();
    const selectedDate = startOfDay(slotInfo.start);

    if (isBefore(selectedDate, startOfDay(currentDate))) {
      alert('You cannot select slots from previous days.');
      return;
    }

    setSelectedSlot(slotInfo);
    setSlotDetails({
      start: slotInfo.start,
      end: slotInfo.end,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlotDetails((prev) => ({ ...prev, [name]: new Date(value) }));
  };

  const saveSlot = () => {
    if (slotDetails.start >= slotDetails.end) {
      alert('End time must be after start time.');
      return;
    }

    const newSlot = {
      title: 'Available Slot',
      start: slotDetails.start,
      end: slotDetails.end,
    };

    setAvailableSlots((prevSlots) => [...prevSlots, newSlot]);
    setSelectedSlot(null);
    toast.success("Slot Added Successfully");
  };

  const deleteSlot = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this slot?');
    if (isConfirmed) {
      setAvailableSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
    }
    toast.success("Slot Deleted Successfully");
  };

  const clearSlots = () => {
    const isConfirmed = window.confirm('Are you sure you want to clear all slots?');
    if (isConfirmed) {
      setAvailableSlots([]);
    }
    toast.success("All Slots Cleared Successfully");
  };

  const calculateDuration = (start, end) => {
    const duration = differenceInMinutes(end, start);
    return `${duration} mins`;
  };

  const isHoliday = (date) => {
    const holidayDate = date.toISOString().split('T')[0];
    return holidays.some((holiday) => holiday.date.iso === holidayDate);
  };

  return (
    <>
    <div className="flex p-6 space-x-6">
      {/* Calendar Section (Left Side) */}
      <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Current Availability</h2>
        <Calendar
          localizer={localizer}
          events={availableSlots}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 500 }}
          views={['month', 'day']}
          defaultView="month"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#34d399',
              color: 'white',
              borderRadius: '4px',
            },
          })}
          dayPropGetter={(date) => {
            if (isHoliday(date)) {
              return { className: 'bg-[#FFCCCB] relative' };
            }
            return {};
          }}
          onNavigate={handleNavigate}
        />
        <button
          onClick={clearSlots}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
        >
          Clear All Slots
        </button>
      </div>

      {/* Editing Section (Right Side) */}
      <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white">
        <h3 className="text-2xl font-bold mb-4 text-green-800">Edit Slot Timing</h3>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Start Time:</label>
          <input
            type="datetime-local"
            name="start"
            value={slotDetails.start ? format(slotDetails.start, "yyyy-MM-dd'T'HH:mm") : ''}
            onChange={handleInputChange}
            step="900"  // Restricts minutes to 00, 15, 30, and 45
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
            step="900"  // Restricts minutes to 00, 15, 30, and 45
            className="w-full p-2 border-2 rounded-lg focus:outline-none focus:border-green-500 transition-all"
          />
        </div>

        <button
          onClick={saveSlot}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
        >
          Save Slot
        </button>

        {/* Display Selected Slots with Duration */}
        <div className="mt-8">
          <h3 className="font-semibold text-green-800 mb-4">Your Selected Availability</h3>
          {availableSlots.length > 0 ? (
            <ul className="space-y-2">
              {availableSlots.map((slot, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-lg shadow-md flex justify-between">
                  <div>
                    {slot.start.toLocaleDateString()} - {slot.start.toLocaleTimeString()} to {slot.end.toLocaleTimeString()}
                    <span className="ml-2 text-sm text-gray-600">({calculateDuration(slot.start, slot.end)})</span>
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
    </div>
    <div className="p-6">
      {/* Upcoming Appointments Section */}
      <div className="w-full p-4 border rounded-lg shadow-lg bg-gradient-to-r from-green-100 via-green-200 to-green-300">
        <h3 className="font-semibold text-green-800 mb-4">Upcoming Bookings</h3>
        <UpComingAppointments />
      </div>
    </div>
    </>
  );
};

export default CalendarPage;
