import { useEffect, useState } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [raffles, setRaffles] = useState([]);
  const [form, setForm] = useState({ name: "", secret_token: "" });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  async function createNewRaffle() {
    try {
      const createRaffle = await fetch(`${API_URL}/raffles`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (createRaffle.ok) {
        const data = await createRaffle.json();
        console.log("created succesfully", data);
        setForm({ name: "", secret_token: "" });
      } else {
        throw new Error("Raffle not created");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // ensure form is being cleared
  useEffect(() => {
    console.log("Form state after render:", form);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewRaffle();
  };

  return (
    <div className="App">
      <h2>New Raffle</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Raffle Name:</label>
        <input
          type="text"
          id="name"
          value={form.name}
          required
          onChange={handleChange}
        />
        <label htmlFor="secret_token">Raffle Secret Token:</label>
        <input
          type="text"
          id="secret_token"
          value={form.secret_token}
          required
          onChange={handleChange}
        />
        <button>Create New Raffle</button>
      </form>
      {raffles.map(({ name, id }) => {
        return <p key={id}>{name}</p>;
      })}
    </div>
  );
}

export default App;
