import React from "react";
import { useParams, Link } from "react-router-dom";
import "./NavBar.scss";
import { Box, Typography } from "@mui/material";

const NavBar = ({ findRaffleName }) => {
  const { id } = useParams();

  return (
    <div className="NavBar">
      <h3 className="NavBar__RaffleName">{findRaffleName(+id)}</h3>
      <Box className="NavBar__nav">
        <Link to="/" className="">
          <span className="material-symbols-outlined">confirmation_number</span>
          <Typography>All Raffles</Typography>
        </Link>
        <Link
          to={`/raffles/${id}`}
          style={{
            backgroundColor:
              !window.location.pathname.includes("participants") &&
              !window.location.pathname.includes("winner")
                ? "lightgrey"
                : "white",
          }}
        >
          <span className="material-symbols-outlined">app_registration</span>
          <Typography>Register</Typography>
        </Link>
        <Link
          to={`/raffles/${id}/participants`}
          style={{
            backgroundColor: window.location.pathname.includes("participants")
              ? "lightgrey"
              : "white",
          }}
        >
          <span className="material-symbols-outlined">groups</span>
          <Typography>Participants</Typography>
        </Link>
        <Link
          to={`/raffles/${id}/winner`}
          style={{
            backgroundColor: window.location.pathname.includes("winner")
              ? "lightgrey"
              : "white",
          }}
        >
          <span className="material-symbols-outlined">trophy</span>
          <Typography>Pick Winner</Typography>
        </Link>
      </Box>
    </div>
  );
};

export default NavBar;
