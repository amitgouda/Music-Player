import React from "react";
import Paper from "@material-ui/core/Paper";

const CustomPaperComponent = ({ children, elevation,styleProps={} }) => {
  return <Paper style={styleProps} elevation={elevation || 2}>{children}</Paper>;
};

export default CustomPaperComponent;
