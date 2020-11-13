import React from "react";
import Button from "@material-ui/core/Button";

const CustomButtonComponent = ({ title, handleOnClick,color }) => {
  return (
    <Button onClick={handleOnClick} variant="outlined" color={color ||"primary"}>
      {title}
    </Button>
  );
};

export default CustomButtonComponent;
