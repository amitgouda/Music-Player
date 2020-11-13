import React from "react";
import CustomPaper from "../CustomPaper";
import CustomButtonComponent from "../CustomButtonComponent";
import "./style.css";

const CustomListCard = ({
  mode,
  songTitle = "asdasds",
  singerName = "asdasds",
  albumName = "asdasds",
  playTime = "asdasds",
  lastElement,
  handleOnClick,
  isSelected,
  _id,
}) => {
  const handleOnSelect = () => {
    if (handleOnClick) handleOnClick(_id, isSelected);
  };

  return (
    <CustomPaper
      styleProps={{
        marginTop: 10,
        backgroundColor: "rgb(0,0,0,0.3)",
        color: "white",
        borderRadius: "4px",
        marginBottom: lastElement ? 25 : 0,
      }}
      elevation={5}
    >
      <div className={"listRootContainer"}>
        <div className={"card-left-container"}>
          <div className={"card-text-div-style"}>
            <span>
              <b>Song Title :&nbsp;</b>
            </span>
            <span>{songTitle}</span>
          </div>
          <div className={"card-text-div-style"}>
            <small>
              <b>Singers :&nbsp;</b>
            </small>
            <small>{singerName}</small>
          </div>
          <div className={"card-text-div-style"}>
            <small>
              <b>Album :&nbsp;</b>
            </small>
            <small>
              <i>{albumName}</i>
            </small>
          </div>
        </div>
        <div
          className={"card-right-container"}
          style={Boolean(mode !== "add") ? { justifyContent: "flex-end" } : {}}
        >
          <div className={"card-text-div-style"}>
            <small>
              <b>Play Time :&nbsp;</b>
            </small>
            <small>{playTime}</small>
          </div>
          {Boolean(mode === "add") && (
            <CustomButtonComponent
              color={"inherit"}
              handleOnClick={handleOnSelect}
              title={isSelected ? "Delete" : "Add to list"}
            />
          )}
        </div>
      </div>
    </CustomPaper>
  );
};

export default CustomListCard;
