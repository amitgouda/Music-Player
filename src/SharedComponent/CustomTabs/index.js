import React from "react";
import CustomPaperComponent from "../CustomPaper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const CustomTabsComponent = ({ activeValue=1, tabNames = [],handleChange }) => {
  return (
    <CustomPaperComponent>
      <Tabs
        value={activeValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        {tabNames.map((tabItem, index) => (
          <Tab key={`${tabItem.label}_${index}`} icon={tabItem.icon} label={tabItem.label || ""} />
        ))}
      </Tabs>
    </CustomPaperComponent>
  );
};

export default CustomTabsComponent;
