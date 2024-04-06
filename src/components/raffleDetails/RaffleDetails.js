import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const RaffleDetails = () => {
  const [raffleDetails, setRaffleDetails] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/raffles/${id}`);
      const { data } = await res.json();
      if (res.ok) {
        setRaffleDetails(data);
      }
    }
    fetchData();
  }, [id]);

  // console.log("raffle details", raffleDetails)

  return (
    <div>
      <h4>{raffleDetails.name}</h4>
      <nav>
        <Button>All Raffles</Button>
        <Button>Register</Button>
        <Button>Participants</Button>
        <Button>Pick Winner</Button>
      </nav>
    </div>
  );
};

export default RaffleDetails;
