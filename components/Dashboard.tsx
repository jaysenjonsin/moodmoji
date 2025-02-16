'use client';
import React, { useEffect, useState } from 'react';
import { Fugaz_One } from 'next/font/google';
import Calendar from './Calendar';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Login from './Login';
import Loading from './Loading';
type Props = {};
const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

const Dashboard = (props: Props) => {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countValues() {
    let totalNumberOfDays = 0;
    let sumMoods = 0;
  }

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    //update curr state, update global state, update firebase
    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      setData(newData);

      //updating firebase
      const docRef = doc(db, 'users', currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true } //merges info with curr firebase data
      );
    } catch (error) {
      console.log('failed to set move');
    }
  }

  const statuses = {
    num_days: 14,
    average_mood: new Date().toDateString(),
    time_remaining: `${now.getHours()}: ${now.getMinutes()}`,
  };

  const moods = {
    bad: '😭',
    sad: '😔',
    existing: '😶',
    good: '😊',
    elated: '😍',
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

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
            onClick={() => {
              const currentMoodValue = i + 1;
              handleSetMood(currentMoodValue);
            }}
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
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
};

export default Dashboard;
