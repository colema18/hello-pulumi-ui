import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';

const API_URL =
  (window as any).API_URL === "__API_URL__"
    ? "http://localhost:5050"
    : (window as any).API_URL;


async function fetchMessage() {
  // ✅ Apply fallback only when the placeholder was not replaced
  const finalUrl = API_URL === "__API_URL__" ? "http://localhost:5050" : API_URL;

  const res = await fetch(`${finalUrl}/api/message`);
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
