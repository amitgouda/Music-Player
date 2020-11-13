import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import CustomPlaylistCard from "../../SharedComponent/CustomPlaylistCard";

const PlayliststabComponent = ({ handleOnselectPlaylist }) => {
  const playLists = useSelector((state) => state.commonReducer.playList);

  const getDate = (time) => moment(time).format("DD MMM YYYY");

  return (
    <React.Fragment>
      {playLists.map((playlistItem, index) => (
        <CustomPlaylistCard
          handleOnselectPlaylist={handleOnselectPlaylist}
          lastElement={index + 1 === playLists.length}
          key={playlistItem._id}
          _id={playlistItem._id}
          playlistTitle={playlistItem.name}
          createdAt={getDate(playlistItem.createdAt)}
          createdBy={playlistItem.createdBy}
        />
      ))}
    </React.Fragment>
  );
};

export default PlayliststabComponent;
