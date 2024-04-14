import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./components/navBar/NavBar";
import NewParticipant from "./components/newParticipant/NewParticipant";
import NewRaffle from "./components/newRaffle/NewRaffle";
import Participants from "./components/participants/Participants";
import Raffles from "./components/raffles/Raffles";
import Winner from "./components/winner/Winner";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState({ name: "", secret_token: "" });
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setErrMsg("");
        const res = await fetch(`${API_URL}/raffles`);
        const { data, error } = await res.json();

        if (res.ok) {
          setRaffles(data);
        } else {
          throw new Error(error);
        }
      } catch (error) {
        setErrMsg(error.message);
      } finally {
        setLoading(false);
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
          message: `Thank you for entering: ${form.name}!`,
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
      setErrMsg(error.message);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalContent(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [modalContent]);

  const findRaffleName = (id) => {
    const match = raffles.find((raffle) => raffle.id === id);
    if (match) {
      return match.name;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewRaffle();
    setOpen(true);
  };

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (errMsg) {
      return <div>Error: {errMsg}</div>;
    } else {
      return (
        <Routes>
          <Route
            path="/raffles/:id/*"
            element={
              <>
                <NavBar findRaffleName={findRaffleName} />
                <Routes>
                  <Route path="/" element={<NewParticipant />} />
                  <Route path="/participants" element={<Participants />} />
                  <Route path="/winner" element={<Winner />} />
                </Routes>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <NewRaffle
                  form={form}
                  handleChange={handleChange}
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                  modalContent={modalContent}
                  open={open}
                />
                <Raffles raffles={raffles} />
              </>
            }
          />
        </Routes>
      );
    }
  };

  return (
    <Router>
      <h2>Raffle App</h2>
      {renderContent()}
    </Router>
  );
}

export default App;
