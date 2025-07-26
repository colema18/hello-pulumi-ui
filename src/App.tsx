import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';

const API_URL =
  (window as any).API_URL && (window as any).API_URL !== "__API_URL__"
    ? (window as any).API_URL
    : "http://localhost:5050";

async function fetchMessage() {
  const res = await fetch(`${API_URL}/api/message`);
  if (!res.ok) throw new Error("Failed to fetch message");
  return res.json();
}

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['message'],
    queryFn: fetchMessage,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
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
