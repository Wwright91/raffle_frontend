import React, { useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const NewParticipant = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const { id } = useParams();

  // console.log("raffle_id", id)

  async function enterNewParticipant() {
    try {
      const createParticipant = await fetch(
        `${API_URL}/raffles/${id}/participants`,
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("new creation", createParticipant)

      if (createParticipant.ok) {
        clearForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const clearForm = () => {
    setForm({ first_name: "", last_name: "", email: "", phone: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enterNewParticipant();
  };

  return (
    <div>
      <h5>Register to participate in the raffle:</h5>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          value={form.first_name}
          required
          onChange={handleChange}
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          value={form.last_name}
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={form.email}
          required
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button>Submit</button>
        <button onClick={clearForm}>Reset</button>
      </form>
    </div>
  );
};

export default NewParticipant;
