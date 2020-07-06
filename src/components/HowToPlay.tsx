import React from "react";
import {
  Drawer,
  Dialog,
  Slide,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import { useWindowSize } from "../hooks/useWindowSize";
import line_example from "../img/line_example.png";
import possible_lines_example from "../img/possible_lines_example.png";

const P = (props: React.HTMLProps<HTMLParagraphElement>) => {
  return (
    <Typography variant="body1" style={{ padding: "5px 0" }}>
      {props.children}
    </Typography>
  );
};

const HowToPlay = (props: { isOpen: boolean; onClose: () => any }) => {
  const windowSize = useWindowSize();
  const maxWidth = 600;
  const width = Math.min(
    Math.min(windowSize.width!, windowSize.height!),
    maxWidth
  );
  return !props.isOpen ? (
    <></>
  ) : (
    <Dialog
      open={props.isOpen}
      TransitionComponent={React.forwardRef((props, ref) => (
        <Slide direction="down" {...{ ref }} {...props} />
      ))}
      onClose={props.onClose}
    >
      <Paper style={{ width }}>
        <Grid style={{ padding: 20 }} container>
          <Typography variant="h4">How to play Linegame</Typography>
          <P>
            The goal of the game is to create as many lines as possible.
            <br />
            The game will end when no more lines can be drawn.
          </P>
          <Grid xs={12} style={{ textAlign: "center" }}>
            <img src={line_example} />
          </Grid>
          <P>
            A line can be created by selecting a dot to start the line from, and
            the direction of the line. The direction can be horizontal,
            vertical, or diagonal.
          </P>
          <Grid xs={12} style={{ textAlign: "center" }}>
            <img src={possible_lines_example} />
          </Grid>
          <P>
            A line must have a length of 5 cells (5 dots), and lines cannot
            overlap each other. <br />
            At the start, most of the dots are unopened - only 1 of the lines
            dots can be unopened when drawing it!
          </P>
          <P>Click on a cell to see what lines can be drawn from it.</P>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default HowToPlay;
