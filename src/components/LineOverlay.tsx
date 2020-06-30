import React, { CSSProperties } from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import { LineModel } from "../classes/LineModel";
import { LineComponent } from "./LineComponent";
import { useWindowSize } from "../hooks/useWindowSize";
let updateCallback = () => {};
export const updateOverlay = () => updateCallback();
export const LineOverlayComponent = observer(
  (props: LineOverlayComponentProps) => {
    const { game, tableRef } = props;
    const { lines } = game;
    const [style, setStyle] = React.useState<CSSProperties>({});
    const windowSize = useWindowSize();
    const [updateId, setUpdateId] = React.useState(0);
    updateCallback = () => setUpdateId(updateId + 1);
    React.useEffect(() => {
      setStyle({
        width: tableRef?.current?.offsetWidth,
        height: tableRef?.current?.clientHeight,
        left: tableRef?.current?.offsetLeft,
        top: tableRef?.current?.offsetTop,
      });
      console.log("set style");
    }, [tableRef, tableRef.current, windowSize, updateId]);
    return (
      <div
        style={{
          position: "absolute",
          background: "rgba(45,91,0,0.15)",
          top: 0,
          left: 0,
          pointerEvents: "none",
          ...style,
        }}
      >
        {Array.isArray(lines) &&
          lines.map((l, i) => (
            <LineComponent key={`line-${i}`} model={l} game={game} />
          ))}
      </div>
    );
  }
);

export interface LineOverlayComponentProps {
  game: Game;
  tableRef: React.RefObject<HTMLTableElement>;
}
