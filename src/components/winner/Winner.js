import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Winner = () => {
  const [winner, setWinner] = useState([]);
  const [form, setForm] = useState({
    secret_token: "",
  });
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/raffles/${id}/winner`);
      const { data } = await res.json();
      console.log(data);
      setWinner(data);
    }
    fetchData();
  }, [id]);

  async function pickAWinner() {
    try {
      const randomWinner = await fetch(`${API_URL}/raffles/${id}/winner`, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (randomWinner.ok) {
        window.location.reload();
      }

      console.log({ randomWinner });
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    pickAWinner();
  };

  return (
    <div>
      {winner?.winner_id ? (
        <div>
          <h5>Winner</h5>
          <img
            src="https://st4.depositphotos.com/6837936/30051/v/450/depositphotos_300513966-stock-illustration-and-the-winner-is-hand.jpg"
            alt="winner"
            height="200px"
            width="200px"
          />
          <h6>
            {winner.first_name} {winner.last_name}
          </h6>
          <p>Registered on {winner.created_on}</p>
          <p># {winner.winner_id}</p>
          <p>{winner.email}</p>
          <p>{winner.phone}</p>
        </div>
      ) : (
        <div>
          <h5>Pick a Winner</h5>
          <form onSubmit={handleSubmit}>
            <label htmlFor="secret_token">key</label>
            <input
              type="text"
              id="secret_token"
              value={form.secret_token}
              placeholder="Secret token"
              required
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Winner;
