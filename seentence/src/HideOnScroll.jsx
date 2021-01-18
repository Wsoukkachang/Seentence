import * as React from "react";
import { Collapse, Slide, useScrollTrigger } from "@material-ui/core";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Collapse appear={false} direction="down" in={!trigger}>
      {children}
    </Collapse>
  );
};

export default HideOnScroll;
