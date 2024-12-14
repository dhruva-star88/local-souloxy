import React from 'react'
import { useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, CalendarIcon } from '@heroicons/react/24/outline';

const PastAppointments = () => {
    const [showAllPast, setShowAllPast] = useState(false);
    const toggleShowAllPast = () => {
        setShowAllPast((prev) => !prev);
      };
    const pastAppointments = [
        { date: '22/11/2024', time: '10:15 PM', client: 'Prakriti' },
        { date: '21/11/2024', time: '06:25 PM', client: 'Akash' },
        { date: '20/11/2024', time: '09:00 AM', client: 'Riya' },
        { date: '19/11/2024', time: '05:30 PM', client: 'Suresh' },
      ];
  return (
    <div className="p-6 border-2 border-blue-200 rounded-lg shadow-md bg-white">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          <span className="text-blue-500">Past</span> Appointments
        </h3>
        {pastAppointments.slice(0, showAllPast ? pastAppointments.length : 2).map((appointment, index) => (
          <div key={index} className="p-3 border-b border-blue-100 hover:bg-blue-50 transition-colors">
            <p className="text-lg font-medium">
              <strong>{appointment.date} {appointment.time}</strong> - {appointment.client}
            </p>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleShowAllPast}
            className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="font-semibold">{showAllPast ? 'Load Less' : 'Load More'}</span>
            {showAllPast ? (
              <ChevronDoubleUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
  )
}

export default PastAppointments