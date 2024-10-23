import React from 'react';
import { Fugaz_One } from 'next/font/google';
import Calendar from './Calendar';
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
  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 p-4 gap-4 bg-indigo-50 text-indigo-500 rounded-lg'>
        {Object.keys(statuses).map((status, idx) => {
          return (
            <div key={idx} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium uppercase text-xs sm:text-sm truncate'>
                {status.replaceAll('_', ' ')}
              </p>
              <p className={`text-base sm:text-lg truncate ` + fugaz.className}>
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
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((mood, i) => (
          <button
            className={`p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 text-center flex flex-col items-center gap-2 flex-1 `}
            key={i}
          >
            {/* ts doesnt know values in object.keys(moods) will always be valid keys for moods object, so tell ts mood variable will always be one of keys of moods obj */}
            <p className='text-4xl sm:text-5xl md:text-6xl'>
              {moods[mood as keyof typeof moods]}
            </p>
            <p
              className={
                `text-indigo-500 text-xs sm:text-sm md:text-base ` +
                fugaz.className
              }
            >
              {mood}
            </p>
          </button>
        ))}
      </div>
      <Calendar />
    </div>
  );
};

export default Dashboard;
