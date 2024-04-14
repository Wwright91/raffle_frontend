import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./NewParticipant.scss";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

const API_URL = process.env.REACT_APP_API_URL;

const NewParticipant = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const { id } = useParams();

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
      <form onSubmit={handleSubmit}>
        <h4>Register to participate in the raffle:</h4>
        <div className="Participants">
          <FormControl sx={{ width: "50%" }}>
            <InputLabel htmlFor="first_name">First Name:*</InputLabel>
            <Input
              type="text"
              id="first_name"
              value={form.first_name}
              required
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel htmlFor="last_name">Last Name:*</InputLabel>
            <Input
              type="text"
              id="last_name"
              value={form.last_name}
              required
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <FormControl>
          <InputLabel htmlFor="email">Email:*</InputLabel>
          <Input
            type="text"
            id="email"
            value={form.email}
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="phone">Phone:</InputLabel>
          <Input
            type="text"
            id="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </FormControl>
        <div className="Buttons">
          <ButtonGroup>
            <Button type="submit" sx={{ bgcolor: "grey", color: "white" }}>
              Submit
            </Button>
            <Button
              type="submit"
              sx={{ bgcolor: "black", color: "white" }}
              onClick={clearForm}
            >
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};

export default NewParticipant;
