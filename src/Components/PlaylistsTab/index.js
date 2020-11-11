import React from "react";
import CustomPlaylistCard from "../../SharedComponent/CustomPlaylistCard";
import { PLAYLIST_CONSTANTS } from "../Home/constants";

const PlayliststabComponent = () => {
  return (
    <React.Fragment>
      {PLAYLIST_CONSTANTS.map((playlistItem, index) => (
        <CustomPlaylistCard
          lastElement={index + 1 === PLAYLIST_CONSTANTS.length}
          key={playlistItem._id}
          playlistTitle={playlistItem.name}
          playTime={playlistItem.createdAt}
        />
      ))}
    </React.Fragment>
  );
};

export default PlayliststabComponent;
