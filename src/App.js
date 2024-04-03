import { useEffect, useState } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/raffles`);
      const { data } = await res.json();
      if (res.ok) {
        setRaffles(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {raffles.map(({ name, id }) => {
        return <p key={id}>{name}</p>;
      })}
    </div>
  );
}

export default App;
