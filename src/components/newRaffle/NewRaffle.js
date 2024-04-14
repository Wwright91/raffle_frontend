import React, { useState } from "react";
import "./NewRaffle.scss";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import ShowModal from "../modal/ShowModal";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const NewRaffle = ({
  form,
  handleChange,
  handleClose,
  handleSubmit,
  modalContent,
  open,
}) => {
  const [showToken, setShowToken] = useState(false);

  const handleShowToken = () => {
    setShowToken(!showToken);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>New Raffle:</h3>
        {modalContent && (
          <ShowModal
            type={modalContent.type}
            message={modalContent.message}
            open={open}
            handleClose={handleClose}
          >
            {modalContent.type === "sucess" ? (
              <div className="success">{modalContent.message}</div>
            ) : (
              <div className="error">{modalContent.message}</div>
            )}
          </ShowModal>
        )}
        <FormControl>
          <InputLabel htmlFor="name">Raffle Name:*</InputLabel>
          <Input
            type="text"
            id="name"
            value={form.name}
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="secret_token">Raffle Secret Token:*</InputLabel>
          <Input
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowToken}
                  edge="end"
                >
                  {showToken ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            type={showToken ? "text" : "password"}
            id="secret_token"
            value={form.secret_token}
            required
            onChange={handleChange}
          />
          <FormHelperText sx={{ color: "black" }}>
            You must remember the Raffle Token because it will be asked when
            picking a winner
          </FormHelperText>
        </FormControl>
        <Button type="submit" sx={{ bgcolor: "grey", color: "white" }}>
          Create New Raffle
        </Button>
      </form>
    </div>
  );
};

export default NewRaffle;
