import React, { useState, useCallback, useEffect, useRef } from "react";
import CustomTabsComponent from "../../SharedComponent/CustomTabs";
import CustomSearchBar from "../../SharedComponent/CustomSearchBar";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import IconButton from "@material-ui/core/IconButton";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SongstabComponent from "../SongsTab";
import PlayliststabComponent from "../PlaylistsTab";
import CustomButtonComponent from "../../SharedComponent/CustomButtonComponent";
import { getAllSongApi } from "../../service/song.service";
import {
  getAllPlaylistApi,
  addPlaylistApi,
  updatePlaylistApi,
} from "../../service/playlist.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setSongsState,
  setPlaylistState,
  toggleSnackBar,
  setUserState,
} from "../../Actions/common";
import CreatePlaylistDialog from "../../SharedComponent/CreatePlaylistDialog";
import CustomSignUpLoginDialog from "../../SharedComponent/CustomSignUpLoginDialog";
import { authenticate } from "../../SharedComponent/helpers/common";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomAddSongsDialog from "../../SharedComponent/CustomAddSongsDialog";
import { useHistory } from "react-router-dom";

import "./style.css";

const HomeComponents = () => {
  const userData = useSelector((state) => state.commonReducer.userData);
  const [activeTabs, setActiveTabs] = useState(0);
  const [playListMode, setPlayListMode] = useState("show");
  const [showProceed, setShowProceed] = useState(true);
  const [openCreatePlaylistModal, toggleCreatePlaylistModal] = useState(false);
  const [openAuthModal, toggleopenAuthModal] = useState(false);
  const [openAddSongsDialog, setOpenAddSongsDialog] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    _id: "",
    name: "",
    createdBy: "",
  });
  const selectedSongsIdArray = useRef([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOntabChange = useCallback((event, newValue) => {
    setActiveTabs(newValue);
  }, []);
  const isAuthenticate = authenticate();

  const handleOnBottomButtonClick = () => {
    if (activeTabs) {
      if (authenticate()) setPlayListMode("add");
      else toggleopenAuthModal(true);

      //  toggleCreatePlaylistModal(true);
    }
  };

  const handleOnCloseCreatePlaylistModal = () => {
    toggleCreatePlaylistModal(false);
  };

  const handleOnSubmitCreatePlaylistModal = (playlistValue) => {
    setPlayListMode("show");
    addPlaylistApi(
      {
        name: playlistValue,
        songsIdArray: selectedSongsIdArray.current,
      },
      (res) => {
        dispatch(toggleSnackBar(true, "Playlist has been sucessfully created"));
        getPlaylistData();
      }
    );
  };

  const handleOnselectPlaylist = (_id, name, createdBy) => {
    setSelectedPlaylist({ _id, name, createdBy });
  };

  const shuffleSongs = () => {
    window.dispatchEvent(new Event("shuffle-songs"));
  };

  useEffect(() => {
    if (!activeTabs) {
      setShowProceed(true);
      if (playListMode !== "show") {
        resetPlaylistdata();
      }
    }
  }, [activeTabs, playListMode]);

  useEffect(() => {
    setPlayListMode(
      selectedPlaylist._id.length ? "view_songs_in_playlist" : "show"
    );
  }, [selectedPlaylist]);

  const resetPlaylistdata = () => {
    setPlayListMode("show");
    setSelectedPlaylist({
      _id: "",
      name: "",
      createdBy: "",
    });
  };

  const getPlaylistData = useCallback(() => {
    getAllPlaylistApi({}, (res) => {
      dispatch(setPlaylistState(res?.data?.data || []));
    });
  }, [dispatch]);

  useEffect(() => {
    getAllSongApi({}, (res) => {
      dispatch(setSongsState(res?.data?.data || []));
    });
    getPlaylistData();
  }, [dispatch, getPlaylistData]);

  const toggleProceedButton = (data) => {
    selectedSongsIdArray.current = data;
    setShowProceed(!Boolean(data.length));
  };

  const handleOnCloseAuthModal = (url) => {
    toggleopenAuthModal(false);
    history.push(url);
  };

  const handleOnCloseAddSongsModal = () => {
    setOpenAddSongsDialog(false);
  };

  const handleOnClickAuthButton = () => {
    if (isAuthenticate) {
      dispatch(toggleSnackBar(true, "Sucessfully logged out"));
      localStorage.clear();
      dispatch(setUserState({ _id: "", email: "" }));
    } else history.push("/login");
  };

  const handleOnSubmitAddSongs = (songsArray) => {
    updatePlaylistApi(
      { playListId: selectedPlaylist._id, songsArray },
      (res) => {
        dispatch(toggleSnackBar(true, "Playlist has been sucessfully updated"));
        resetPlaylistdata();
        getPlaylistData();
      }
    );
  };

  const handleOnPressBack = () => {
    setPlayListMode("show");
  };

  const OptionComponent = () => (
    <div className={"option-container"}>
      <IconButton
        color={"inherit"}
        aria-label="delete"
        onClick={handleOnPressBack}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <div className={"option-button-container"}>
        <CustomButtonComponent
          color={"inherit"}
          title={"Shuffle Play"}
          handleOnClick={shuffleSongs}
        />
        {selectedPlaylist.createdBy === userData._id && (
          <CustomButtonComponent
            handleOnClick={() => setOpenAddSongsDialog(true)}
            color={"inherit"}
            title={"Edit Playlist"}
          />
        )}
      </div>
    </div>
  );

  const CreatePlaylistOption = () => (
    <div
      style={{ display: "flex", justifyContent: "flex-end", color: "white" }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ paddingRight: 20 }}>
          <CustomButtonComponent
            color={"inherit"}
            title={"Cancel"}
            handleOnClick={() => setPlayListMode("show")}
          />
        </div>
        <CustomButtonComponent
          color={"inherit"}
          disabled={showProceed}
          title={"Proceed"}
          handleOnClick={() => toggleCreatePlaylistModal(true)}
        />
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className={"rootContainer"}>
        <div className={"searchtabContainer"}>
          <div className={"mainTabContainer"}>
            <div style={{ width: 20 }} />
            <CustomTabsComponent
              handleChange={handleOntabChange}
              activeValue={activeTabs}
              tabNames={[
                { label: "All  Songs", icon: <LibraryMusicIcon /> },
                { label: "Playlists", icon: <FeaturedPlayListIcon /> },
              ]}
            />

            <CustomButtonComponent
              handleOnClick={handleOnClickAuthButton}
              title={authenticate() ? "Log out" : "Sign in"}
              color={"inherit"}
            />
          </div>
          {playListMode === "view_songs_in_playlist" ? (
            <OptionComponent />
          ) : (
            <CustomSearchBar />
          )}
          <div
            style={{
              height: "40vh",
              overflowY: "auto",
              padding: "0 10px 0 10px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {activeTabs === 0 ? (
              <SongstabComponent mode={"view"} />
            ) : playListMode === "add" ? (
              <SongstabComponent
                mode={playListMode}
                toggleProceedButton={toggleProceedButton}
              />
            ) : playListMode === "view_songs_in_playlist" ? (
              <SongstabComponent
                mode={playListMode}
                selectedPlaylist={selectedPlaylist}
                toggleProceedButton={toggleProceedButton}
              />
            ) : (
              <PlayliststabComponent
                handleOnselectPlaylist={handleOnselectPlaylist}
              />
            )}
          </div>
          <div style={{ color: "white" }}>
            {Boolean(activeTabs) &&
              (playListMode === "add" ? (
                <CreatePlaylistOption />
              ) : playListMode !== "view_songs_in_playlist" ? (
                <CustomButtonComponent
                  color={"inherit"}
                  handleOnClick={handleOnBottomButtonClick}
                  title={!activeTabs ? "Add Song" : "Create Playlist"}
                />
              ) : null)}
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
      {openAuthModal && (
        <CustomSignUpLoginDialog
          isOpen={openAuthModal}
          handleClose={handleOnCloseAuthModal}
        />
      )}
      {openAddSongsDialog && (
        <CustomAddSongsDialog
          isOpen={openAddSongsDialog}
          selectedPlaylist={selectedPlaylist}
          handleClose={handleOnCloseAddSongsModal}
          handleOnSubmit={handleOnSubmitAddSongs}
        />
      )}
    </React.Fragment>
  );
};

export default HomeComponents;
