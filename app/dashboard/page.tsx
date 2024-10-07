import { Metadata } from 'next';
import React from 'react';
import Main from '../../components/Main';
import Dashboard from '../../components/Dashboard';
import Login from '../../components/Login';

export const metadata: Metadata = {
  title: 'moodmoji dashboard',
};
type Props = {};

const DashboardPage = (props: Props) => {
  let isAuthenticated = true;
  let children = <Login />;

  if (isAuthenticated) {
    children = <Dashboard />;
  }
  return <Main>{children}</Main>;
};

export default DashboardPage;
