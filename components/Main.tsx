import React, { ReactNode } from 'react';

type Props = { children: ReactNode };
const Main = ({ children }: Props) => {
  return <main className='flex-1 flex flex-col p-4 sm:p-8'>{children}</main>;
};

export default Main;
