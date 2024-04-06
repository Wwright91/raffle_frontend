import React from "react";

const Raffle = ({ raffle, id }) => {
  const { name, created_on, winner_id, raffled_on } = raffle;
  return (
    <div key={id}>
      <h4>{name}</h4>
      <p>Created on: {created_on}</p>
      <p>Winner Id: {winner_id !== null ? winner_id : "No one yet"}</p>
      <p>
        {raffled_on !== null ? `Raffled on: ${raffled_on}` : "Not raffled yet"}
      </p>
    </div>
  );
};

export default Raffle;
