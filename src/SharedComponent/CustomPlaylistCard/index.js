import React from "react";
import CustomPaper from "../CustomPaper";
import "./style.css";

const CustomPlayListCard = ({
  playlistTitle = "asdasds",
  playTime = "asdasds",
  lastElement,
}) => {
  return (
    <div style={{ marginTop: 10, paddingBottom: lastElement ? 25 : 0 }}>
      <CustomPaper elevation={5}>
        <div className={"listRootContainer"}>
          <div>
            <div className={"card-text-div-style"}>
              <span>{playlistTitle}</span>
            </div>
          </div>
          <div className={"card-text-div-style"}>
            <span>Created At : </span>
            <span>{playTime}</span>
          </div>
        </div>
      </CustomPaper>
    </div>
  );
};

export default CustomPlayListCard;
