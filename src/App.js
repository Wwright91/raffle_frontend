import { useEffect, useState } from "react";
import "./App.css";

import NewRaffle from "./components/newRaffle/NewRaffle";
import Raffles from "./components/raffles/Raffles";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [form, setForm] = useState({ name: "", secret_token: "" });
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
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
        setModalContent({
          type: "Raffle Created Successfully",
          message: `Thank you for entering ${form.name}!`,
        });
        setForm({ name: "", secret_token: "" });

        const updatedRafflesData = await fetch(`${API_URL}/raffles`);
        if (updatedRafflesData.ok) {
          const updatedRaffle = await updatedRafflesData.json();
          setRaffles(updatedRaffle.data);
        }
      } else {
        const errorData = await createRaffle.json();
        let errorMessage = errorData.error.includes("name")
          ? "Raffle name already exists. Please try again!"
          : "Secret token already exists. Please try again!";
        setModalContent({
          type: "Oops There Was An Error",
          message: errorData.message || errorMessage,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalContent(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [modalContent]);

  useEffect(() => {
    console.log("Form state after render:", form);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewRaffle();
    setOpen(true);
  };

  return (
    <div className="App">
      <NewRaffle
        form={form}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        modalContent={modalContent}
        open={open}
      />
      <Raffles raffles={raffles} />
    </div>
  );
}

export default App;
