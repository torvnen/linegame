import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import Title from "./Title";
import MenuList from "@material-ui/core/MenuList";
import ListItem from "@material-ui/core/ListItem";
import ThemeSelector from "./ThemeSelector";
import { useThemeSelector } from "../hooks/useThemeSelector";
import Flexbox from "./Flexbox";
import SaveGameIcon from "@material-ui/icons/SaveTwoTone";
import NewGameIcon from "@material-ui/icons/NoteAddTwoTone";
import LoadGameIcon from "@material-ui/icons/RestorePageTwoTone";
import InstructionsIcon from "@material-ui/icons/InfoTwoTone";
import { saveGame, newGame, loadGame } from "../App";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";

const MenuLinkItem = (props: {
  onClick?: () => void;
  icon?: JSX.Element;
  text: string;
  fontSize?: "130%" | "100%";
}) => {
  const { icon, onClick, text, fontSize } = props;
  return (
    <ListItem onClick={onClick} style={{ cursor: "pointer" }}>
      <Button fullWidth>
        <Flexbox style={{ width: "70%" }}>
          <span
            style={{ width: 40, marginRight: fontSize === "100%" ? 5 : 15 }}
          >
            {icon && icon}
          </span>
          <Typography
            color="textPrimary"
            style={{ fontSize: fontSize || "130%", marginTop: 3 }}
          >
            {text}
          </Typography>
        </Flexbox>
      </Button>
    </ListItem>
  );
};

const Menu = observer((props: { game: Game }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme } = useThemeSelector();
  return (
    <>
      <Title {...{ isMenuOpen, setIsMenuOpen }} />
      <Typography>Points: {props.game.lineCount}</Typography>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Flexbox
          style={{
            flexFlow: "column",
            alignItems: "center",
            overflow: "hidden",
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <MenuList
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              width: 300,
              height: 550,
              backgroundColor: theme.palette.background.paper,
              color: "#fff",
              textAlign: "center",
            }}
          >
            <ListItem>
              <ThemeSelector />
            </ListItem>
            <Divider style={{ margin: "2px 10px" }} />
            <MenuLinkItem
              text="New game"
              icon={<NewGameIcon fontSize="large" />}
              onClick={() => {
                newGame();
                setIsMenuOpen(false);
              }}
            />
            <MenuLinkItem
              text="Save game"
              icon={<SaveGameIcon fontSize="large" />}
              onClick={() => {
                saveGame();
                setIsMenuOpen(false);
              }}
            />
            <MenuLinkItem
              text="Load game"
              icon={<LoadGameIcon fontSize="large" />}
              onClick={() => {
                loadGame().then((isSuccess) => {
                  setIsMenuOpen(false);
                });
              }}
            />
            <Divider style={{ margin: "2px 10px" }} />
            <MenuLinkItem
              text="How to play?"
              fontSize="100%"
              icon={<InstructionsIcon fontSize="default" onClick={() => {}} />}
            />
          </MenuList>
        </Flexbox>
      </Drawer>
    </>
  );
});

export default Menu;
