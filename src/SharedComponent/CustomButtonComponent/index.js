import React from "react";
import Button from "@material-ui/core/Button";

const CustomButtonComponent = ({ title, handleOnClick }) => {
  return (
    <Button onClick={handleOnClick} variant="outlined" color="primary">
      {title}
    </Button>
  );
};

export default CustomButtonComponent;
