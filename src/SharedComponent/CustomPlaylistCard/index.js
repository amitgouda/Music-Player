import React from "react";
import CustomPaper from "../CustomPaper";
import "./style.css";

const CustomPlayListCard = ({
  playlistTitle = "",
  createdAt = "",
  lastElement,
  handleOnselectPlaylist,
  _id,
  createdBy
}) => {
  return (
    <CustomPaper
      styleProps={{
        marginTop: 10,
        backgroundColor: "rgb(0,0,0,0.3)",
        color: "white",
        borderRadius: "4px",
        cursor: 'pointer',
        marginBottom: lastElement ? 25 : 0,
      }}
      elevation={5}
      onClick={() => handleOnselectPlaylist(_id,playlistTitle,createdBy)}
    >
      <div className={"listRootContainer"}>
        <div>
          <div className={"card-text-div-style"}>
            <small>
              <b>Title :&nbsp;</b>
            </small>
            <small>{playlistTitle}</small>
          </div>
        </div>
        <div className={"card-text-div-style"}>
          <small>
            <b>Created At :&nbsp;</b>
          </small>
          <small>{createdAt}</small>
        </div>
      </div>
    </CustomPaper>
  );
};

export default CustomPlayListCard;
