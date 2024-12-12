import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore, startOfDay, differenceInMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, EyeIcon } from '@heroicons/react/24/outline';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const CalendarPage = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
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
    setShowModal(false);
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
    <div className="flex">
      {/* Main Content (Calendar and Slot Selection) */}
      <div className="w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Current Availability</h2>

        {/* Calendar for Selecting Available Slots */}
        <div className="mb-8 p-4 border rounded-lg shadow-md bg-gradient-to-r from-green-100 via-green-200 to-green-300">
          <h3 className="font-semibold text-green-800 mb-4">Select Your Available Slots</h3>
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <Calendar
              localizer={localizer}
              events={availableSlots}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              style={{ height: 500 }}
              views={['month', 'day', 'agenda']}
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
              tileContent={({ date }) => {
                if (holidays.length === 0) return null;
                const holiday = holidays.find(holiday => holiday.date.iso === date.toISOString().split('T')[0]);
                if (holiday) {
                  return (
                    <div className="absolute bottom-2 left-2 text-xs font-semibold text-white">
                      {holiday.name}
                    </div>
                  );
                }
                return null;
              }}
              onNavigate={handleNavigate}
            />
          </div>
          <button
            onClick={clearSlots}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            Clear All Slots
          </button>
        </div>

        {/* Modal for Editing Slot Times */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-70 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Edit Slot Timing</h3>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Start Time:</label>
                <input
                  type="datetime-local"
                  name="start"
                  value={format(slotDetails.start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">End Time:</label>
                <input
                  type="datetime-local"
                  name="end"
                  value={format(slotDetails.end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSlot}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                >
                  Save Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Selected Slots with Duration */}
        <div className="p-4 border rounded-lg shadow-lg bg-gradient-to-r from-green-100 via-green-200 to-green-300 mt-4">
          <h3 className="font-semibold text-green-800 mb-4">Your Selected Availability</h3>
          {availableSlots.length > 0 ? (
            <ul className="space-y-2">
              {availableSlots.map((slot, index) => (
                <li key={index} className="p-2 bg-white rounded-lg shadow-md">
                  {slot.start.toLocaleDateString()} - {slot.start.toLocaleTimeString()} to {slot.end.toLocaleTimeString()}
                  <span className="ml-2 text-sm text-gray-600">({calculateDuration(slot.start, slot.end)})</span>
                  <button
                    onClick={() => deleteSlot(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
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

        {/* Upcoming Appointments Section */}
        <div className="mt-8 p-4 border rounded-lg shadow-lg bg-gradient-to-r from-green-100 via-green-200 to-green-300">
          <h3 className="font-semibold text-green-800 mb-4">Upcoming Bookings</h3>
          <UpComingAppointments />
        </div>
      </div>
    </div>
  );
};

// `UpComingAppointments` Component (as per your example)
const UpComingAppointments = () => {
  const upcomingAppointments = [
    { date: '25/11/2024', time: '10:15 PM', client: 'Prakriti' },
    { date: '26/11/2024', time: '11:00 AM', client: 'Arjun' },
    { date: '27/11/2024', time: '02:30 PM', client: 'Meera' },
    { date: '28/11/2024', time: '04:45 PM', client: 'Rohan' },
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="p-6 bg-green-50 border border-green-300 shadow-md rounded-xl">
      <h3 className="text-2xl font-bold text-green-800 mb-4">Upcoming Appointments</h3>
      <ul className="space-y-4">
        {upcomingAppointments
          .slice(0, showAll ? upcomingAppointments.length : 2)
          .map((appointment, index) => (
            <li key={index} className="flex justify-between text-lg font-medium text-gray-700">
              <span>
                {appointment.date} - {appointment.time}
              </span>
              <span className="text-blue-600">{appointment.client}</span>
            </li>
          ))}
      </ul>

      {/* View More / View Less Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={toggleShowAll}
          className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          <EyeIcon className="h-5 w-5" />
          <span className="font-semibold">{showAll ? 'View Less' : 'View More'}</span>
          {showAll ? (
            <ChevronDoubleUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;
