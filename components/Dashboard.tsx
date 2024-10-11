import React from 'react';

type Props = {};

const Dashboard = (props: Props) => {
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: new Date().toDateString(),
  };
  return (
    <div className='flex flex-col flex-1'>
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        {Object.keys(statuses).map((status, idx) => {
          return (
            <div key={idx}>
              <p className='font-medium uppercase'>
                {status.replaceAll('_', ' ')}
              </p>
              {/* @ts-ignore */}
              <p>{statuses[status]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
