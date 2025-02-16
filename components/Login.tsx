'use client';

import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });
type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  const handleSubmit = async () => {
    try {
      if (!email || !password || password.length < 6) return;
      setAuthenticating(true);
      if (isRegister) {
        await signup(email, password);
        console.log('signing up new user');
      } else {
        console.log('logging in existing user');
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  };
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`text-4xl sm:text-5xl md:text-6xl ` + fugaz.className}>
        {isRegister ? 'Register' : 'Login'}
      </h3>
      <p>You're one step away!</p>
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none '
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none '
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? 'Submitting' : 'Submit'}
          full
        />
      </div>
      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : `Don't have an Account? `}
        <button
          onClick={() => setIsRegister((prev) => !prev)}
          className='text-indigo-600'
        >
          {isRegister ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
};

export default Login;
