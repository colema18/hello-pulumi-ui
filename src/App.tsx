import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';

async function fetchMessage() {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL || 'http://localhost:5050'}/api/message`
  );
  if (!res.ok) throw new Error('Failed to fetch message');
  return res.json();
}

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['message'],
    queryFn: fetchMessage,
    refetchInterval: 2000, // 👈 refetch every 2 seconds
    refetchOnWindowFocus: true, // also refetch when tab is focused
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching message</p>}
        {data && <p>Hello World {data.message}</p>}
      </header>
    </div>
  );
}

export default App;
