import React from "react";
import Raffle from "../raffle/Raffle";

const Raffles = ({ raffles }) => {
  return (
    <div>
      <h3>Raffles</h3>
      {
        raffles.map((raffle, id) => {
          return (
            <Raffle raffle={raffle} key={id} />
          )
        })
      }
    </div>
  );
};

export default Raffles;
