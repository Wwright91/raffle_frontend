import React from "react";
import { Link, useParams } from "react-router-dom";

const NavBar = ({ findRaffleName }) => {
  const { id } = useParams();

  return (
    <div>
      <h3>{findRaffleName(+id)}</h3>
      <nav>
        <Link to="/">All Raffles</Link>
        <Link to={`/raffles/${id}`}>Register</Link>
        <Link to={`/raffles/${id}/participants`}>Participants</Link>
        <Link to={`/raffles/${id}/winner`}>Pick Winner</Link>
      </nav>
    </div>
  );
};

export default NavBar;
