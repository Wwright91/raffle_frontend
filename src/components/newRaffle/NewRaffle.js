import React from "react";
import ShowModal from "../modal/ShowModal";

const NewRaffle = ({
  form,
  handleChange,
  handleClose,
  handleSubmit,
  modalContent,
  open,
}) => {
  return (
    <div>
      {" "}
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
      <h2>New Raffle</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Raffle Name:</label>
        <input
          type="text"
          id="name"
          value={form.name}
          required
          onChange={handleChange}
        />
        <label htmlFor="secret_token">Raffle Secret Token:</label>
        <input
          type="text"
          id="secret_token"
          value={form.secret_token}
          required
          onChange={handleChange}
        />
        <button>Create New Raffle</button>
      </form>
    </div>
  );
};

export default NewRaffle;
