import React from "react";
import Flexbox from "./Flexbox";
import { useThemeSelector } from "../hooks/useThemeSelector";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import MenuList from "@material-ui/core/MenuList";
import ListItem from "@material-ui/core/ListItem";
import ThemeSelector from "./ThemeSelector";

const Title = (props: {
  isMenuOpen: boolean;
  setIsMenuOpen: (is: boolean) => void;
}) => {
  const { theme } = useThemeSelector();
  const { isMenuOpen, setIsMenuOpen } = props;
  return (
    <>
      <Flexbox style={{ padding: "10px 25px" }}>
        <Flexbox style={{ flexGrow: 1 }}>
          <h1 style={{ color: theme.palette.text.primary, paddingBottom: 5 }}>
            Linegame
          </h1>
        </Flexbox>
        <Flexbox>
          <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {!isMenuOpen && <MenuIcon color="action" />}
            {isMenuOpen && <MenuOpenIcon />}
          </IconButton>
        </Flexbox>
      </Flexbox>
    </>
  );
};

export default Title;
