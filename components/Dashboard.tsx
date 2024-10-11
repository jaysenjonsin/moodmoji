import React from 'react';
import { Fugaz_One } from 'next/font/google';
type Props = {};
const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

const Dashboard = (props: Props) => {
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: new Date().toDateString(),
  };

  const moods = {
    bad: '😭',
    sad: '😔',
    existing: '😶',
    good: '😊',
    elated: '😍',
  };
  console.log('hi');
  return (
    <div className='flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12'>
      <div className='grid grid-cols-1 sm:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg'>
        {Object.keys(statuses).map((status, idx) => {
          return (
            <div key={idx} className='p-4 flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium uppercase text-xs sm:text-sm'>
                {status.replaceAll('_', ' ')}
              </p>
              <p className={`text-base sm:text-lg ` + fugaz.className}>
                {statuses[status as keyof typeof statuses]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          `text-5xl sm:text-6xl md:text-7xl text-center ` + fugaz.className
        }
      >
        How do you <span className='textGradient'>Feel</span> today?
      </h4>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        {Object.keys(moods).map((mood, i) => (
          <button className='' key={i}>
            <p>{mood}</p>
            {/* ts doesnt know values in object.keys(moods) will always be valid keys for moods object, so tell ts mood variable will always be one of keys of moods obj */}
            <p>{moods[mood as keyof typeof moods]}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
