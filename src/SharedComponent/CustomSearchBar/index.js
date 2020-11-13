import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { setSongsSearchState } from "../../Actions/common";

import "./style.css";

const CustomSearchBar = () => {
  const dispatch = useDispatch();
  const searchString = useSelector((state) => state.commonReducer.searchString);

  const handleOnSearch = (event) => {
    dispatch(setSongsSearchState(event.target.value));
  };

  return (
    <div className={"rootSearchContainer"}>
      <div className={"search-container"}>
        <div style={{ marginRight: "4px" }}>
          <SearchIcon color={"white"} />
        </div>
        <InputBase
          placeholder="Search for songs..."
          fullWidth={true}
          value={searchString}
          onChange={handleOnSearch}
          classes={
            {
              /*  root: classes.inputRoot,
            input: classes.inputInput, */
            }
          }
        />
      </div>
    </div>
  );
};

export default CustomSearchBar;
