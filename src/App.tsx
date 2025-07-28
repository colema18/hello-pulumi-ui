import React from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import defaultLogo from "./logo.svg";

const API_URL =
  (window as any).API_URL === "__API_URL__"
    ? "http://localhost:5050"
    : (window as any).API_URL;

async function fetchMessage() {
  const finalUrl = API_URL === "__API_URL__" ? "http://localhost:5050" : API_URL;

  const res = await fetch(`${finalUrl}/api/message`);
  if (!res.ok) throw new Error("Failed to fetch message");
  return res.json(); // expects { message, logo, backgroundColor }
}

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["message"],
    queryFn: fetchMessage,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  // Use values from backend, fallback to defaults if missing
  const logo = data?.logo || defaultLogo;
  const backgroundColor = data?.backgroundColor || "#282c34";

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor }}>
        <img src={logo} className="App-logo" alt="logo" />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching message</p>}
        {data && <p>Hello World {data.message}</p>}
      </header>
    </div>
  );
}

export default App;
