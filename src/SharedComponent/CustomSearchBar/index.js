import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import "./style.css";

const CustomSearchBar = () => {
  return (
    <div className={"rootSearchContainer"}>
      <div className={"search-container"}>
        <div style={{ marginRight: "4px" }}>
          <SearchIcon color={"white"} />
        </div>
        <InputBase
          placeholder="Search for songs..."
          fullWidth={true}
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
