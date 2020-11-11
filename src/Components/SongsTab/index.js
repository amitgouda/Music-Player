import React from "react";
import CustomListCard from "../../SharedComponent/CustomSongListCard";
import { SONGS_CONSTANTS } from "../Home/constants";

const SongstabComponent = () => {
  return (
    <React.Fragment>
      {SONGS_CONSTANTS.map((songItem, index) => (
        <CustomListCard
          lastElement={index + 1 === SONGS_CONSTANTS.length}
          key={songItem._id}
          songTitle={songItem.name}
          singerName={songItem.singers}
          albumName={songItem.album}
          playTime={songItem.time}
        />
      ))}
    </React.Fragment>
  );
};

export default SongstabComponent;
