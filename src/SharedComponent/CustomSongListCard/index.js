import React from "react";
import CustomPaper from "../CustomPaper";
import "./style.css";

const CustomListCard = ({
  songTitle = "asdasds",
  singerName = "asdasds",
  albumName = "asdasds",
  playTime = "asdasds",
  lastElement
}) => {
  return (
    <div style={{marginTop:10,paddingBottom: lastElement? 25:0}} >
      <CustomPaper elevation={5} >
        <div className={"listRootContainer"}>
          <div>
            <div className={"card-text-div-style"}>
              <span>Song Title</span>
              <span>{songTitle}</span>
            </div>
            <div className={"card-text-div-style"}>
              <span>Singers</span>
              <span>{singerName}</span>
            </div>
            <div className={"card-text-div-style"}>
              <span>Album</span>
              <span>{albumName}</span>
            </div>
          </div>
          <div className={"card-text-div-style"}>
            <span>Play Time : </span>
            <span>{playTime}</span>
          </div>
        </div>
      </CustomPaper>
    </div>
  );
};

export default CustomListCard;
