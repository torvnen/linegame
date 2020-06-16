import React, { CSSProperties } from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import { LineModel } from "../classes/Line";
import { dissectDirection } from "../classes/Direction";

const LINE_THICKNESS = 3;
const LINE_OPACITY = 0.75;
export const LineComponent = observer((props: LineComponentProps) => {
  const { game, model } = props;
  const { lines } = game;
  const [style, setStyle] = React.useState<CSSProperties>({
  });
  React.useEffect(() => {
    //const cells = model.coords.map((v, i, a) => game.cellAt(v.x, v.y));
    if (!!model) {
      const firstTdRef = model.getFirstCell(game)?.tdRef;
      const lastTdRef = model.getLastCell(game)?.tdRef;
      const { direction } = model;
      const dd = dissectDirection(direction);
      if (
        !!firstTdRef &&
        !!firstTdRef.current &&
        !!lastTdRef &&
        !!lastTdRef.current
      ) {
        const firstTd = firstTdRef.current;
        const lastTd = lastTdRef.current;
        let [offsetX, y1, y2, w, h, deg] = [0, 0, 0, 0, 0, 0, 0];
        if (dd.isHorizontal) {
          console.log(
            "firstTd.offsetLeft, lastTd.offsetLeft",
            firstTd.offsetLeft,
            lastTd.offsetLeft
          );
          h = LINE_THICKNESS;
          y1 = y2 = firstTd.offsetTop + firstTd.offsetHeight / 2;

          if (dd.isRight) {
            w = Math.abs(firstTd.offsetLeft - lastTd.offsetLeft) +
              0.5 * firstTd.offsetWidth;
            deg = 0;
            offsetX = firstTd.offsetLeft + 0.25 * firstTd.offsetWidth;
          } else {
            w = Math.abs(lastTd.offsetLeft - firstTd.offsetLeft) +
              0.5 * firstTd.offsetWidth;
            deg = 180;
            offsetX = firstTd.offsetLeft + 0.75 * firstTd.offsetWidth;
          }
        } else if (dd.isVertical) {
          offsetX = firstTd.offsetLeft + firstTd.offsetWidth / 2;
          if (dd.isUp) {
            y1 = firstTd.offsetTop + firstTd.offsetHeight;
          } else {
          }
        }
        setStyle({
          ...style,
          left: offsetX,
          width: w,
          height: h,
          top: y1,
          transformOrigin: "0% 50%",
          transform: `rotate(${deg}deg)`,
          position: "absolute",
        });
      }
    }
  }, [model, game, model.coords]);
  return <div style={style}>
    <div style={{
      animationName: 'grow',
      opacity: LINE_OPACITY,
      animationDuration: '1s',
      animationTimingFunction: "cubiz-bezier(0, 20, 50, 90)",
      background: "green",
      height: LINE_THICKNESS
    }}></div>
  </div>;
});

export interface LineComponentProps {
  model: LineModel;
  game: Game;
}
