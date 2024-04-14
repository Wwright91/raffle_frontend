import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Winner.scss";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { CardContent, FormLabel, Typography } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const Winner = () => {
  const [form, setForm] = useState({
    secret_token: "",
  });
  const [winner, setWinner] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/raffles/${id}/winner`);
      const { data } = await res.json();
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
        <>
          <h3>Winner</h3>
          <div className="Winner">
            <Card>
              <CardMedia
                component="img"
                image="https://st4.depositphotos.com/6837936/30051/v/450/depositphotos_300513966-stock-illustration-and-the-winner-is-hand.jpg"
                title="winner"
              />
              <CardContent>
                <Typography component="h3">
                  {winner.first_name} {winner.last_name}
                </Typography>
                <Typography component="p">
                  Registered on {new Date(winner.created_on).toString()}
                </Typography>
                <hr />
                <Typography component="p">
                  <span className="material-symbols-outlined">tag</span>{" "}
                  {winner.winner_id}
                </Typography>
                <Typography component="p">
                  {" "}
                  <span className="material-symbols-outlined">mail</span>{" "}
                  {winner.email}
                </Typography>
                <Typography component="p">
                  <span className="material-symbols-outlined">phone_enabled</span>{" "}
                  {winner.phone}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="PickWinner">
          <h3>Pick a Winner</h3>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="secret_token"></FormLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <span className="material-symbols-outlined">
                      key_vertical
                    </span>
                  </InputAdornment>
                }
                type="text"
                id="secret_token"
                value={form.secret_token}
                placeholder="Secret token"
                required
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" sx={{ bgcolor: "grey", color: "white" }}>
              Pick a Winner
            </Button>
          </form>
          <br />
          <div className="Secret_Token">
            <h4>Secret Token</h4>
            <p>
              The secret token used when creating the raffle must be provided.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Winner;
