import React from "react";
import "./Participant.scss";

const Participant = ({ participant }) => {
  const { first_name, last_name, id, email, phone } = participant;
  return (
    <div className="Participant">
      <img
        src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
        alt="avatar"
      />
      <div>
        <h3>
          {first_name} {last_name}
        </h3>
        <p># {id}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
};

export default Participant;
