import React from "react";
import { useSelector } from "react-redux";
import CustomPlaylistCard from "../../SharedComponent/CustomPlaylistCard";

const PlayliststabComponent = () => {
  const playLists = useSelector((state) => state.commonReducer.playList);
  
  console.log(playLists)
  return (
    <React.Fragment>
      {playLists.map((playlistItem, index) => (
        <CustomPlaylistCard
          lastElement={index + 1 === playLists.length}
          key={playlistItem._id}
          playlistTitle={playlistItem.name}
          playTime={playlistItem.createdAt}
        />
      ))}
    </React.Fragment>
  );
};

export default PlayliststabComponent;
