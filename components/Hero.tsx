import React from 'react';

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className='py-10 sm:py-14 md:py-20'>
      <h1>
        <span>moodmoji</span> tracks your <span>daily</span>mood
      </h1>
    </div>
  );
};

export default Hero;
