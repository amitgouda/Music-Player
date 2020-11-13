import React, { useEffect, useState } from "react";
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
import CustomRadioComponent from "../CustomRadioComponent";
import { useSelector } from "react-redux";
import "./../CreatePlaylistDialog/style.css";

const CustomAddSongsDialog = ({
  isOpen,
  handleClose,
  handleOnSubmit,
  selectedPlaylist,
}) => {
  const playLists = useSelector((state) => state.commonReducer.playList);
  const songLists = useSelector((state) => state.commonReducer.songList);
  const [enableSave, setEnableSave] = useState(false);
  const [selectedSongsIDArray, setSelectedSongsIDArray] = useState([]);

  useEffect(() => {
    const selectedPlaylistObj = playLists.find(
      (item) => item._id === selectedPlaylist._id
    );

    setSelectedSongsIDArray(selectedPlaylistObj.songsId);
  }, [selectedPlaylist, playLists, songLists]);

  const handleOnClickOk = () => {
    if (handleOnSubmit) handleOnSubmit(selectedSongsIDArray);
    handleClose();
  };

  const handleOnSelect = (_id, isSelected) => {
    if (!enableSave) setEnableSave(true);

    const selectedListArray = selectedSongsIDArray.slice();

    if (isSelected) {
      const selectedIndex = selectedListArray.findIndex((item) => item === _id);
      if (selectedIndex !== -1) {
        selectedListArray.splice(selectedIndex, 1);
      }
    } else {
      selectedListArray.push(_id);
    }
    setSelectedSongsIDArray(selectedListArray);
  };
  console.log(selectedSongsIDArray);

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
          <Typography variant="h5">Select Songs</Typography>
          <IconButton onClick={handleClose} aria-label="delete" size="medium">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers style={{ height: "50vh", alignItems: "center" }}>
        {songLists.map((item) => (
          <CustomRadioComponent
            _id={item._id}
            label={item.title}
            isSelected={selectedSongsIDArray.includes(item._id)}
            handleOnSelect={handleOnSelect}
          />
        ))}
      </DialogContent>
      <DialogActions
        style={{
          background: "linear-gradient(to top,#00cdac,#02aab0)",
          color: "white",
        }}
      >
        <CustomButtonComponent
          color={"inherit"}
          title={"Save"}
          disabled={!enableSave}
          handleOnClick={handleOnClickOk}
        />
        <div style={{ width: 20 }} />
      </DialogActions>
    </Dialog>
  );
};

export default CustomAddSongsDialog;
