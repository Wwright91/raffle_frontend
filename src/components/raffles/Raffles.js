import React from "react";

const Raffles = ({ raffles }) => {
  return (
    <div>
      <h3>Raffles</h3>
      {raffles.map(({ name, created_on, winner_id, raffled_on, id }) => {
        return (
          <div key={id}>
            <h4>{name}</h4>
            <p>Created on: {created_on}</p>
            <p>Winner Id: {winner_id !== null ? winner_id : "No one yet"}</p>
            <p>
              {raffled_on !== null
                ? `Raffled on: ${raffled_on}`
                : "Not raffled yet"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Raffles;
