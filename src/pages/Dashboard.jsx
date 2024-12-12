//Dashboard.jsx

import React from 'react';
import TherapistAbout from '../components/TherapistAbout';
import UpComingAppointments from '../components/UpComingAppoitments';
import PendingMessages from '../components/PendingMessages';

const Dashboard = () => {
  const therapistDetails = {
    name: 'Dr. Jane Smith',
    bio: 'Dr. Jane Smith is a licensed therapist specializing in anxiety and stress management with over 10 years of experience.',
    qualifications: 'PhD in Clinical Psychology, Licensed Professional Counselor (LPC)',
    experience: '10+ years in Cognitive Behavioral Therapy (CBT) and Mindfulness-Based Stress Reduction (MBSR)',
    focus: 'Anxiety, Stress Management, and Mindfulness',
    location: 'New York City, NY'
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <TherapistAbout {...therapistDetails} />
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
        Your Schedule Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UpComingAppointments />
          <PendingMessages />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
