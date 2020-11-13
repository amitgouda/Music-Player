import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomButtonComponent from "../CustomButtonComponent";
import "./../CreatePlaylistDialog/style.css";

const CustomSignUpLoginDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const handleOnSubmit = () => {
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"xs"}
      fullWidth={true}
    >
      <DialogTitle
        style={{ background: "linear-gradient(to top,#00cdac,#02aab0)" }}
      >
        <div className={"head-container"} style={{ color: "white" }}>
          <Typography variant="h5">Need to Login / Sign up</Typography>
          <IconButton onClick={handleClose} aria-label="delete" size="medium">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers style={{ height: 50, alignItems: "center" }}>
        <Typography variant="h5">
          Sign up or login to create a playlist
        </Typography>
      </DialogContent>
      <DialogActions
        style={{
          background: "linear-gradient(to top,#00cdac,#02aab0)",
          color: "white",
        }}
      >
        <CustomButtonComponent
          color={"inherit"}
          title={"Login"}
          handleOnClick={handleOnSubmit}
        />
        <CustomButtonComponent
          color={"inherit"}
          title={"Sign up"}
          handleOnClick={handleOnSubmit}
        />
        <div style={{ width: 20 }} />
      </DialogActions>
    </Dialog>
  );
};

export default CustomSignUpLoginDialog;
