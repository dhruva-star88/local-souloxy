import React, { useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, EyeIcon } from '@heroicons/react/24/outline';

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

export default UpComingAppointments
