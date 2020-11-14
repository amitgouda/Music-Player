import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";
import { toggleSnackBar } from "../../Actions/common";

const TransitionsSnackbar = ({ isOpen, message }) => {
  const dispatch = useDispatch();
  const [Transition] = useState(Slide);

  const handleClose = () => {
    dispatch(toggleSnackBar(false, ""));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2500}
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      //message={message || "test"}
      key={Transition.name}
    >
      <SnackbarContent message={message || "message"} />
    </Snackbar>
  );
};

export default TransitionsSnackbar;
