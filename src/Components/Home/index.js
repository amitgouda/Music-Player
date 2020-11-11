import React, { useState, useCallback, useEffect } from "react";
import CustomTabsComponent from "../../SharedComponent/CustomTabs";
import CustomSearchBar from "../../SharedComponent/CustomSearchBar";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SongstabComponent from "../SongsTab";
import PlayliststabComponent from "../PlaylistsTab";
import CustomButtonComponent from "../../SharedComponent/CustomButtonComponent";
import { getAllSongApi } from "../../service/song.service";
import { useDispatch, useSelector } from "react-redux";
import { setSongsState } from "../../Actions/common";
import "./style.css";

const HomeComponents = () => {
  const [activeTabs, setActiveTabs] = useState(0);
  const dispatch = useDispatch();
  const songLists = useSelector((state) => state.commonReducer.songList);

  const handleOntabChange = useCallback(
    (event, newValue) => {
      setActiveTabs(newValue);
    },
    [activeTabs]
  );

  useEffect(() => {
    getAllSongApi({}, (res) => {
      dispatch(setSongsState(res?.data?.data || []));
    });
  }, []);

  return (
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
            margin: "10px 25px 10px 25px",
          }}
        >
          {activeTabs === 0 ? <SongstabComponent /> : <PlayliststabComponent />}
        </div>
        <div>
          <CustomButtonComponent
            title={!activeTabs ? "Add Song" : "Create Playlist"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeComponents;
