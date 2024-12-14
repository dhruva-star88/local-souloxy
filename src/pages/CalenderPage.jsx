import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore, startOfDay, differenceInMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpComingAppointments from '../components/UpComingAppoitments';
import EditingSlots from '../components/EditingSlots';

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
    console.log(slotInfo); // Debugging if the function is triggered

    const now = new Date();
    const currentDate = startOfDay(now); // Reset to start of today

    const selectedDate = startOfDay(slotInfo.start); // Start of the selected slot date

    if (isBefore(selectedDate, currentDate)) {
      alert('You cannot select slots from previous days.');
      return;
    }

    // Get the current time rounded to nearest 30 minutes
    const currentHour = now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / 30) * 30;
    const startTime = new Date(selectedDate);
    startTime.setHours(currentHour, currentMinute, 0, 0);

    // Default end time to 30 minutes after start time
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 30);

    setSelectedSlot(slotInfo);
    setSlotDetails({
      start: startTime,
      end: endTime,
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

    const isDuplicate = availableSlots.some(
      (slot) =>
        slot.start.getTime() === slotDetails.start.getTime() &&
        slot.end.getTime() === slotDetails.end.getTime()
    );

    if (isDuplicate) {
      alert('This slot has already been selected. Please choose a different slot.');
      return;
    }

    const newSlot = {
      title: 'Available Slot',
      start: slotDetails.start,
      end: slotDetails.end,
    };

    setAvailableSlots((prevSlots) => [...prevSlots, newSlot]);
    setSelectedSlot(null);
    toast.success('Slot Added Successfully');
  };

  const deleteSlot = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this slot?');
    if (isConfirmed) {
      setAvailableSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
    }
    toast.success('Slot Deleted Successfully');
  };

  const clearSlots = () => {
    const isConfirmed = window.confirm('Are you sure you want to clear all slots?');
    if (isConfirmed) {
      setAvailableSlots([]);
    }
    toast.success('All Slots Cleared Successfully');
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
        <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Current Availability</h2>
          <Calendar
            localizer={localizer}
            events={availableSlots}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot} // Ensure this handler is attached
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

        <EditingSlots
          slotDetails={slotDetails}
          handleInputChange={handleInputChange}
          saveSlot={saveSlot}
          availableSlots={availableSlots}
          deleteSlot={deleteSlot}
          calculateDuration={calculateDuration}
        />
      </div>
      <div className="p-6">
        <div className="w-full p-4 border rounded-lg shadow-lg bg-gradient-to-r from-green-100 via-green-200 to-green-300">
          <h3 className="font-semibold text-green-800 mb-4">Upcoming Bookings</h3>
          <UpComingAppointments />
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
