import React from "react";
import CustomListCard from "../../SharedComponent/CustomSongListCard";
import { useSelector } from "react-redux";

const SongstabComponent = () => {
  const songLists = useSelector((state) => state.commonReducer.songList);
  const convertToMin = (time) => (time / 60).toFixed(2) + " sec";

  return (
    <React.Fragment>
      {songLists.map((songItem, index) => (
        <CustomListCard
          lastElement={index + 1 === songLists.length}
          key={songItem._id}
          songTitle={songItem.title}
          singerName={songItem.singer}
          albumName={songItem?.albumData?.title || ""}
          playTime={convertToMin(songItem.playTime)}
        />
      ))}
    </React.Fragment>
  );
};

export default SongstabComponent;
