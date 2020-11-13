import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import './style.css'

const CreatePlaylistDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [playlistValue, setPlaylistValue] = useState("");
  const [isError, setError] = useState(false);

  const handleOnChangeOfValue = (event) => {
      setError(!Boolean(event.target.value.length));
      setPlaylistValue(event.target.value);
  };

  const handleOnSubmit =  ()  => {
    if(handleSubmit)
    handleSubmit(playlistValue)
    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'md'}
      fullWidth={true}
    >
      <DialogTitle>
        <div className={'head-container'} >
        <span>Create Playlist</span>
        <IconButton  onClick={handleClose} aria-label="delete" size="medium">
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
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: "white", background:Boolean(playlistValue.length) ? "#c51162":"grey" }}
          onClick={handleOnSubmit}
          disabled={ !Boolean(playlistValue.length) }
        >
          Create Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistDialog;
