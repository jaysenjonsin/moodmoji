import { Metadata } from 'next';
import React from 'react';
import Main from '../../components/Main';
import Dashboard from '../../components/Dashboard';
import Login from '../../components/Login';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';

export const metadata: Metadata = {
  title: 'moodmoji dashboard',
};
type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
};

export default DashboardPage;
