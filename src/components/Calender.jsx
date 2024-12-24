import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, startOfDay, isPast, isToday } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const CalendarPage = ({ availableSlots, selectedSlot, setSelectedSlot, setDate }) => {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    const date = startOfDay(slotInfo.start);

    if (isPast(date) && !isToday(date)){
      alert("Cannot select the slots from past days")
      return
    }
    
    setDate(date) // Set the clicked date
    setSelectedSlot(slotInfo);
    setSelectedDate(date);
  };

  const handleHoverDate = (slotInfo) => {
    const date = startOfDay(slotInfo.start);
    if (!isPast(date) || isToday(date)) {
      setHoveredDate(date);
    }
  }
  const handleMouseEnter = (date) => {
    setHoveredDate(date);
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const isDateSelected = (date) => {
    const day = startOfDay(date);
    return selectedDate && day.getTime() === selectedDate.getTime()
  }

  return (
    <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Current Availability</h2>
      <Calendar
        localizer={localizer}
        events={availableSlots}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onNavigate={(date) => setDate(startOfDay(date))}
        onMouseOver={(slot) => handleHoverDate(slot)}
        style={{ height: 500 }}
        views={['month', 'agenda']}
        defaultView="month"
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
      {hoveredDate && (
        <p className="text-green-500">Hovering: {format(hoveredDate, 'yyyy-MM-dd')}</p>
      )}
    </div>
  );
};

export default CalendarPage;
