import React from "react";
import Button from "@material-ui/core/Button";

const CustomButtonComponent = ({ title, handleOnClick,color,disabled=false }) => {
  return (
    <Button onClick={handleOnClick} variant="outlined" disabled={disabled} color={color ||"primary"}>
      {title}
    </Button>
  );
};

export default CustomButtonComponent;
