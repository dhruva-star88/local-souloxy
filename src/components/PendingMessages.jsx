import React, { useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const PendingMessages = () => {
  const pendingMessages = [
    { date: '25/11/2024', time: '10:15 PM', client: 'Prakriti' },
    { date: '24/11/2024', time: '6:25 PM', client: 'Akash' },
    { date: '23/11/2024', time: '3:45 PM', client: 'Meera' },
    { date: '22/11/2024', time: '11:00 AM', client: 'Rohan' },
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="p-6 bg-blue-50 border border-blue-300 shadow-md rounded-xl">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">Pending Messages</h3>
      <ul className="space-y-4">
        {pendingMessages.slice(0, showAll ? pendingMessages.length : 2).map((message, index) => (
          <li key={index} className="flex justify-between text-lg font-medium text-gray-700">
            <span>
              {message.date} - {message.time}
            </span>
            <span className="text-green-600">{message.client}</span>
          </li>
        ))}
      </ul>

      {/* View More / View Less Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={toggleShowAll}
          className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          <EnvelopeIcon className="h-5 w-5" />
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

export default PendingMessages;
