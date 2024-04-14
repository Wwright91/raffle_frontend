import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Participant from "../participant/Participant";

const API_URL = process.env.REACT_APP_API_URL;

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_URL}/raffles/${id}/participants`);
      const { data } = await res.json();
      setParticipants(data);
    }
    fetchData();
  }, [id]);

  return (
    <div className="Participants">
      <h3>Participants: {participants.length} Total</h3>
      {participants.map((participant) => {
        return <Participant key={participant.id} participant={participant} />;
      })}
    </div>
  );
};

export default Participants;
