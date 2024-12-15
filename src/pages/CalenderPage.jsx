import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore, startOfDay, differenceInMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [slotDetails, setSlotDetails] = useState({ start: '', end: '' });
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleNavigate = (date) => {
    setCurrentMonth(date.getMonth());
  };

  const handleSelectSlot = (slotInfo) => {
    const now = new Date();
    const currentDate = startOfDay(now);
    const selectedDate = startOfDay(slotInfo.start);

    if (isBefore(selectedDate, currentDate)) {
      alert('You cannot select slots from previous days.');
      return;
    }

    const currentHour = now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / 30) * 30;
    const startTime = new Date(selectedDate);
    startTime.setHours(currentHour, currentMinute, 0, 0);

    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 30);

    setSelectedSlot(slotInfo);
    setSlotDetails({
      start: startTime,
      end: endTime,
    });
  };

  const handleMouseEnter = (date) => {
    setHoveredDate(date);
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const isDateSelected = (date) => {
    return selectedSlot && startOfDay(selectedSlot.start).getTime() === startOfDay(date).getTime();
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
            onSelectSlot={handleSelectSlot}
            style={{ height: 500 }}
            views={['month']}
            defaultView="month"
            onNavigate={handleNavigate}
            dayPropGetter={(date) => {
              const isSelected = isDateSelected(date);
              const isHovered = hoveredDate && startOfDay(hoveredDate).getTime() === startOfDay(date).getTime();

              return {
                className: isSelected
                  ? 'bg-[#c3e6cb] cursor-pointer'
                  : isHovered
                  ? 'hover:bg-[#e0f2f1] cursor-pointer'
                  : 'cursor-pointer',
                onMouseEnter: () => handleMouseEnter(date),
                onMouseLeave: handleMouseLeave,
              };
            }}
          />
        </div>

        <EditingSlots
          slotDetails={slotDetails}
          handleInputChange={(e) => {
            const { name, value } = e.target;
            setSlotDetails((prev) => ({ ...prev, [name]: new Date(value) }));
          }}
          saveSlot={() => {
            if (slotDetails.start >= slotDetails.end) {
              alert('End time must be after start time.');
              return;
            }
            setAvailableSlots((prevSlots) => [...prevSlots, { ...slotDetails, title: 'Available Slot' }]);
            setSelectedSlot(null);
            toast.success('Slot Added Successfully');
          }}
          availableSlots={availableSlots}
          deleteSlot={(index) => {
            if (window.confirm('Are you sure you want to delete this slot?')) {
              setAvailableSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
              toast.success('Slot Deleted Successfully');
            }
          }}
          calculateDuration={(start, end) => `${differenceInMinutes(end, start)} mins`}
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
