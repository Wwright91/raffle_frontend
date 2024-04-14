import React from "react";
import "./Raffles.scss";
import Raffle from "../raffle/Raffle";

const Raffles = ({ raffles }) => {
  return (
    <div className="Raffles">
      <h3>All Raffles:</h3>
      {raffles.map((raffle, id) => {
        return <Raffle raffle={raffle} key={id} />;
      })}
    </div>
  );
};

export default Raffles;
