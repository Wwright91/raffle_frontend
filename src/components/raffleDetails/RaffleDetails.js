import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewParticipant from "../newParticipant/NewParticipant";

const API_URL = process.env.REACT_APP_API_URL;

const RaffleDetails = () => {
  const [raffleDetails, setRaffleDetails] = useState([]);
  const [view, setView] = useState("register");

  const { id } = useParams();
  const navigate = useNavigate();

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
        <Button onClick={() => navigate("/")}>All Raffles</Button>
        <Button onClick={() => setView("register")}>Register</Button>
        <Button onClick={() => setView("participants")}>Participants</Button>
        <Button onClick={() => setView("winner")}>Pick Winner</Button>
      </nav>
      {view === "register" && (
        <div>
          Register Participant
          <NewParticipant id={id} />
        </div>
      )}
      {view === "participants" && <div>Participants</div>}
      {view === "winner" && <div>Winner</div>}
    </div>
  );
};

export default RaffleDetails;
