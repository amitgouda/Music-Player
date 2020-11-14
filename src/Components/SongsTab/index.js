import React, { useEffect, useState, useRef, useCallback } from "react";
import CustomListCard from "../../SharedComponent/CustomSongListCard";
import { useSelector } from "react-redux";
import { shuffleArray } from "../../SharedComponent/helpers/common";

const SongstabComponent = ({ mode, toggleProceedButton, selectedPlaylist }) => {
  const songLists = useSelector((state) => state.commonReducer.songList);
  const playLists = useSelector((state) => state.commonReducer.playList);
  const searchString = useSelector((state) => state.commonReducer.searchString);
  const convertToMin = (time) => (time / 60).toFixed(2) + " min";
  const [songsListArray, setSongsListArray] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const previousSelectedCount = useRef(0);

  const shuffleSongsList = useCallback(() => {
    setSongsListArray(shuffleArray(songsListArray.slice()));
  }, [songsListArray]);

  const handleOnSelect = (_id, isSelected) => {
    const selectedListArray = selectedList.slice();

    if (isSelected) {
      const selectedIndex = selectedListArray.findIndex((item) => item === _id);
      if (selectedIndex !== -1) {
        selectedListArray.splice(selectedIndex, 1);
      }
    } else {
      selectedListArray.push(_id);
    }

    if (selectedListArray.length !== previousSelectedCount.current) {
      if (toggleProceedButton) toggleProceedButton(selectedListArray);
    }

    previousSelectedCount.current = selectedListArray.length;
    setSelectedList(selectedListArray);
  };

  useEffect(() => {
    if (mode === "view_songs_in_playlist") {
      const selectedPlaylistObj = playLists.find(
        (item) => item._id === selectedPlaylist._id
      );

      setSongsListArray(
        songLists.filter((item) =>
          selectedPlaylistObj.songsId.includes(item._id)
        )
      );
    } else {
      setSongsListArray(
        songLists.filter(
          (item) =>
            item.title
              .toLocaleLowerCase()
              .search(searchString.toLocaleLowerCase()) !== -1
        )
      );
    }
  }, [searchString, songLists,mode,playLists,selectedPlaylist]);

  useEffect(() => {
    window.addEventListener("shuffle-songs", shuffleSongsList);
    return () => {
      window.removeEventListener("shuffle-songs", shuffleSongsList);
    };
  }, [shuffleSongsList]);

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
