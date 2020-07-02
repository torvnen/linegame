import React, { CSSProperties } from "react";
import Game from "../classes/Game";
import { BOARD_MATRIX_SIZE } from "../classes/constants";
import { Row } from "./Row";
import { observer } from "mobx-react";
import Menu from "./Menu";
import { LineOverlayComponent, updateOverlay } from "./LineOverlay";
import { useThemeSelector } from "../hooks/useThemeSelector";
import Flexbox from "./Flexbox";
import { useWindowSize } from "../hooks/useWindowSize";
import HowToPlay from "./HowToPlay";

export const Board = observer((props: { game: Game }) => {
  const { game } = props;
  const tableRef = React.useRef<HTMLTableElement>(null);
  const { theme } = useThemeSelector();
  const windowSize = useWindowSize();
  const sizeConstraint = Math.min(windowSize.height!, windowSize.width!);
  const frameWidthTotal = 20;
  const maxCellSize = 25;
  const cellSize = Math.min(
    Math.floor((sizeConstraint - frameWidthTotal) / BOARD_MATRIX_SIZE),
    maxCellSize
  );
  React.useEffect(() => {
    updateOverlay();
  }, [windowSize]);
  const style: CSSProperties = {
    width: BOARD_MATRIX_SIZE * cellSize,
    margin: "auto",
  };
  const [isHowToPlayOpen, setIsHowToPlayOpen] = React.useState(false);
  return (
    <Flexbox
      style={{
        background: theme.palette.background.default,
        margin: "auto",
        justifyContent: "center",
        flexFlow: "column",
        border: `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <Flexbox
        style={{
          flexFlow: "column",
          margin: "auto",
          padding: 5,
          borderRadius: theme.spacing(1),
          background: theme.palette.background.paper,
        }}
      >
        <Menu game={game} openHowToPlay={() => setIsHowToPlayOpen(true)} />
        <HowToPlay isOpen={isHowToPlayOpen} onClose={() => setIsHowToPlayOpen(false)} />
        <table ref={tableRef} cellSpacing={1} style={style}>
          <tbody>
            {game.rows.map((row) => (
              <Row game={game} key={row.yIndex} {...row} cellSize={cellSize} />
            ))}
          </tbody>
        </table>
        <LineOverlayComponent game={game} tableRef={tableRef} />
      </Flexbox>
    </Flexbox>
  );
});
