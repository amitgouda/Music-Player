import React, { useState, useCallback, useEffect } from "react";
import CustomTabsComponent from "../../SharedComponent/CustomTabs";
import CustomSearchBar from "../../SharedComponent/CustomSearchBar";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SongstabComponent from "../SongsTab";
import PlayliststabComponent from "../PlaylistsTab";
import CustomButtonComponent from "../../SharedComponent/CustomButtonComponent";
import { getAllSongApi } from "../../service/song.service";
import { getAllPlaylistApi } from "../../service/playlist.service";
import { useDispatch, useSelector } from "react-redux";
import { setSongsState, setPlaylistState } from "../../Actions/common";
import CreatePlaylistDialog from "../../SharedComponent/CreatePlaylistDialog";

import "./style.css";

const HomeComponents = () => {
  const [activeTabs, setActiveTabs] = useState(0);
  const [playListMode, setPlayListMode] = useState("show");
  const [openCreatePlaylistModal, toggleCreatePlaylistModal] = useState(false);
  const dispatch = useDispatch();

  const handleOntabChange = useCallback((event, newValue) => {
    setActiveTabs(newValue);
  }, []);

  const handleOnBottomButtonClick = () => {
    if (activeTabs) {
      setPlayListMode("add");

      //  toggleCreatePlaylistModal(true);
    }
  };

  const handleOnCloseCreatePlaylistModal = () => {
    toggleCreatePlaylistModal(false);
  };

  const handleOnSubmitCreatePlaylistModal = (playlistValue) => {
    console.log(playlistValue);
  };

  useEffect(() => {
    getAllSongApi({}, (res) => {
      dispatch(setSongsState(res?.data?.data || []));
    });

    getAllPlaylistApi({}, (res) => {
      dispatch(setPlaylistState(res?.data?.data || []));
    });
  }, []);

  return (
    <React.Fragment>
      <div className={"rootContainer"}>
        <div className={"searchtabContainer"}>
          <div className={"mainTabContainer"}>
            <CustomTabsComponent
              handleChange={handleOntabChange}
              activeValue={activeTabs}
              tabNames={[
                { label: "All  Songs", icon: <LibraryMusicIcon /> },
                { label: "Playlists", icon: <FeaturedPlayListIcon /> },
              ]}
            />
          </div>
          <CustomSearchBar />
          <div
            style={{
              height: "40vh",
              overflowY: "auto",
              padding: "0 10px 0 10px",
              marginTop: "20px",
            }}
          >
            {activeTabs === 0 ? (
              <SongstabComponent mode={"view"} />
            ) : playListMode === "add" ? (
              <SongstabComponent mode={playListMode} />
            ) : (
              <PlayliststabComponent />
            )}
          </div>
          <div>
            <CustomButtonComponent
              handleOnClick={handleOnBottomButtonClick}
              title={!activeTabs ? "Add Song" : "Create Playlist"}
            />
          </div>
        </div>
      </div>
      {openCreatePlaylistModal && (
        <CreatePlaylistDialog
          isOpen={openCreatePlaylistModal}
          handleClose={handleOnCloseCreatePlaylistModal}
          handleSubmit={handleOnSubmitCreatePlaylistModal}
        />
      )}
    </React.Fragment>
  );
};

export default HomeComponents;
