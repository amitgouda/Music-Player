import React from "react";
import { Radio, Typography } from "@material-ui/core";
import "./style.css";

const CustomRadioComponent = ({ handleOnSelect, isSelected, _id, label }) => {
  return (
    <div
      className={"root-radio-container"}
      onClick={() => handleOnSelect(_id,isSelected)}
    >
      <Radio checked={isSelected} />
      <Typography>{label}</Typography>
    </div>
  );
};

export default CustomRadioComponent;
