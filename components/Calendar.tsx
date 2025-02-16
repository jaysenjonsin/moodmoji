'use client';
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react';
import { baseRating, gradients, demoData } from '@/utils';

type Props = {
  demo: boolean;
};

const months = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};
const now = new Date();
const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });
const Calendar = ({ demo, completeData, handleSetMood }: Props) => {
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currMonth]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = Object.keys(months).indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  function handleIncrementMonth(val) {
    //+1 or -1 val
    //if hit bounds of months, adjust year displayed
  }

  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  ); //first day of curr month
  const firstDayOfMonth = monthNow.getDay(); //calculate day of week for first day of month
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate(); //get # of days in curr month by getting the '0th' day of the next month

  const daysToDisplay = firstDayOfMonth + daysInMonth; //days in month + blank cells at start if month doesnt start sunday
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0); //if any leftovers add extra row
  return (
    <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
      {/* make array with num rows elements -> it isnt iterable so we have to spread it and get the keys(indexes), then put in back in arr in order to map this array */}
      {/*@ts-ignore */}
      {[...Array(numRows).keys()].map((row, rowIndex) => (
        <div key={rowIndex} className='grid grid-cols-7 gap-1'>
          {/* cant use implicit return here bc inner calculations */}
          {dayList.map((dayOfWeek, dayOfWeekIndex) => {
            //calculate curr day of month for each cell
            let dayIndex =
              rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
            //--> this determines blanks ex. if first of month wed, mon tues blank
            let dayDisplay =
              dayIndex > daysInMonth
                ? false
                : row === 0 && dayOfWeekIndex < firstDayOfMonth
                ? false
                : true;

            let isToday = dayIndex === now.getDate();

            if (!dayDisplay) {
              return <div className='bg-white' key={dayOfWeekIndex} />;
            }

            let color = demo
              ? gradients.indigo[baseRating[dayIndex]]
              : dayIndex in demoData
              ? gradients.indigo[demoData[dayIndex]]
              : 'white';

            return (
              <div
                style={{ background: color }}
                className={
                  'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
                  (isToday ? 'border-indigo-400' : 'border-indigo-100 ') +
                  (color === 'white' ? 'text-indigo-400 ' : 'text-white ')
                }
                key={dayOfWeekIndex}
              >
                <p>{dayIndex}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
