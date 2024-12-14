import React, { useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, CalendarIcon } from '@heroicons/react/24/outline';
import PastAppointments from '../components/PastAppointments';

const Appointments = () => {
  const upcomingAppointments = [
    { date: '25/11/2024', time: '10:15 PM', client: 'Prakriti' },
    { date: '26/11/2024', time: '11:00 AM', client: 'Arjun' },
    { date: '27/11/2024', time: '02:30 PM', client: 'Meera' },
    { date: '28/11/2024', time: '04:45 PM', client: 'Rohan' },
  ];

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  const toggleShowAllUpcoming = () => {
    setShowAllUpcoming((prev) => !prev);
  };

  return (
    <div className="p-8 bg-blue-50">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-8">
        <span className="text-blue-600">Appointments</span> Overview
      </h2>

      {/* Upcoming Appointments */}
      <div className="mb-8 p-6 border-2 border-blue-200 rounded-lg shadow-md bg-white">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          <span className="text-blue-500">Upcoming</span> Appointments
        </h3>
        {upcomingAppointments.slice(0, showAllUpcoming ? upcomingAppointments.length : 2).map((appointment, index) => (
          <div key={index} className="p-3 border-b border-blue-100 hover:bg-blue-50 transition-colors">
            <p className="text-lg font-medium">
              <strong>{appointment.date} {appointment.time}</strong> - {appointment.client}
            </p>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleShowAllUpcoming}
            className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="font-semibold">{showAllUpcoming ? 'Load Less' : 'Load More'}</span>
            {showAllUpcoming ? (
              <ChevronDoubleUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Past Appointments */}
      <PastAppointments />
      
    </div>
  );
};

export default Appointments;
