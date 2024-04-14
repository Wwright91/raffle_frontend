import React from "react";
import "./Raffle.scss";
import { Link } from "react-router-dom";

const Raffle = ({ raffle }) => {
  const { name, winner_id, created_on, raffled_on, id } = raffle;

  return (
    <div key={id} className="Raffle">
      <Link to={`/raffles/${id}`}>
        <h4>{name}</h4>
        <p>
          <span className="material-symbols-outlined">calendar_add_on</span>{" "}
          Created on: {new Date(created_on).toString()}
        </p>
        <p>
          <span className="material-symbols-outlined">trophy</span> Winner Id:{" "}
          {winner_id !== null ? winner_id : "No one yet"}
        </p>
        <p>
          <span className="material-symbols-outlined">event_available</span>
          {raffled_on !== null
            ? `Raffled on: ${new Date(raffled_on)}`
            : "Not raffled yet"}
        </p>
      </Link>
    </div>
  );
};

export default Raffle;
