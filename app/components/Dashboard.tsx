"use client"
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Main from './Main';
import Login from './Login';
import Loading from './Loading';
import { useAuth } from '../context/AuthContext';

export default function Dashboard(props) {
  const { children } = props
  const { user, loading } = useAuth()

  let render : React.ReactNode = (
    <Login />
  )

  if (loading) {
    render = (
      <Loading size='12' />
    )
  }

  if (user) {
    render = (
      <div className='flex flex-1 flex-col min-h-screen w-full'>
        <Nav />
        <div className='flex flex-1 w-full pl-48 flex justify-center items-start'>
          {children}
        </div>
      </div>
    )
  }

  return (
    <Main>
        {render}
    </Main>
  );
}
