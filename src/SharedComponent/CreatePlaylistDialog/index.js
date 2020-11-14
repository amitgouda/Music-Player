import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomButtonComponent from "../CustomButtonComponent";
import "./style.css";

const CreatePlaylistDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [playlistValue, setPlaylistValue] = useState("");
  const [isError, setError] = useState(false);

  const handleOnChangeOfValue = (event) => {
    setError(!Boolean(event.target.value.length));
    setPlaylistValue(event.target.value);
  };

  const handleOnSubmit = () => {
    if (handleSubmit) handleSubmit(playlistValue);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle
        style={{ background: "linear-gradient(to top,#00cdac,#02aab0)" }}
      >
        <div className={"head-container"} style={{ color: "white" }}>
          <Typography variant="h5">Create Playlist</Typography>
          <IconButton onClick={handleClose} aria-label="delete" size="medium">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          value={playlistValue}
          error={isError}
          helperText={isError ? "Cannot Be Blank" : ""}
          label="Name of PlayList"
          required
          fullWidth
          onChange={handleOnChangeOfValue}
        />
        <div style={{ width: 20 }} />
      </DialogContent>
      <DialogActions
        style={{
          background: "linear-gradient(to top,#00cdac,#02aab0)",
          color: "white",
        }}
      >
        <CustomButtonComponent
          disabled={!Boolean(playlistValue.length)}
          title={"Create Playlist"}
          color={"inherit"}
          handleOnClick={handleOnSubmit}
        />
        <div style={{ width: 20 }} />
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistDialog;
