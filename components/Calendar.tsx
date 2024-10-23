import { Fugaz_One } from 'next/font/google';
import React from 'react';

type Props = {};

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
const Calendar = (props: Props) => {
  const year = 2024;
  const month = 'July';
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1); //first day of curr month
  const firstDayOfMonth = monthNow.getDay(); //which day was first day
  const daysInMonth = new Date(year, Object.keys(month).indexOf(month) + 1, 0); //day before first of month

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);
  return <div>Calendar</div>;
};

export default Calendar;
