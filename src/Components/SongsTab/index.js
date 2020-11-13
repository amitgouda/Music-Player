import React, { useEffect, useState } from "react";
import CustomListCard from "../../SharedComponent/CustomSongListCard";
import { useSelector } from "react-redux";

const SongstabComponent = ({ mode }) => {
  const songLists = useSelector((state) => state.commonReducer.songList);
  const searchString = useSelector((state) => state.commonReducer.searchString);
  const convertToMin = (time) => (time / 60).toFixed(2) + " min";
  const [songsListArray, setSongsListArray] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const handleOnSelect = (_id, isSelected) => {
      const selectedListArray   =  selectedList.slice()

    if (isSelected) {
      const selectedIndex = selectedListArray.findIndex((item) => item === _id);
      if (selectedList !== -1) {
        selectedListArray.splice(selectedIndex, 1);
      }
    } else {
      selectedListArray.push(_id);
    }

    setSelectedList(selectedListArray);
  };

  useEffect(() => {
    setSongsListArray(
      songLists.filter(
        (item) =>
          item.title
            .toLocaleLowerCase()
            .search(searchString.toLocaleLowerCase()) !== -1
      )
    );
  }, [searchString, songLists]);

  const isSelected = (id) => selectedList.includes(id);

  return (
    <React.Fragment>
      {songsListArray.map((songItem, index) => (
        <CustomListCard
          mode={mode}
          lastElement={index + 1 === songsListArray.length}
          key={songItem._id}
          _id={songItem._id}
          songTitle={songItem.title}
          singerName={songItem.singer}
          albumName={songItem?.albumData?.title || ""}
          playTime={convertToMin(songItem.playTime)}
          handleOnClick={handleOnSelect}
          isSelected={isSelected(songItem._id)}
        />
      ))}
    </React.Fragment>
  );
};

export default SongstabComponent;
