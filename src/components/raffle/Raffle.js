import React from "react";
import { Link } from "react-router-dom";

const Raffle = ({ raffle }) => {
  const { name, created_on, winner_id, raffled_on, id } = raffle;

  return (
    <div key={id}>
      <Link to={`/raffles/${id}`}>
        <h4>{name}</h4>
        <p>Created on: {created_on}</p>
        <p>Winner Id: {winner_id !== null ? winner_id : "No one yet"}</p>
        <p>
          {raffled_on !== null
            ? `Raffled on: ${raffled_on}`
            : "Not raffled yet"}
        </p>
      </Link>
    </div>
  );
};

export default Raffle;
