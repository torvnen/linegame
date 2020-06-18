import React, { CSSProperties } from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";
import { LineModel } from "../classes/Line";

export const LINE_THICKNESS = 3;
const LINE_OPACITY = 0.75;
export const LineComponent = observer((props: LineComponentProps) => {
  const { game, model } = props;
  const { lines } = game;
  const { dimensions } = model;
  return (
    <div
      style={{
        left: dimensions.offsetX,
        width: dimensions.lengthPx,
        height: LINE_THICKNESS,
        top: dimensions.offsetY,
        transformOrigin: model.transformOrigin,
        transform: `rotate(${dimensions.rotationDeg}deg)`,
        position: "absolute",
      }}
    >
      <div
        style={{
          animationName: "grow",
          opacity: LINE_OPACITY,
          animationDuration: "1s",
          animationTimingFunction: "cubiz-bezier(0, 20, 50, 90)",
          background: "green",
          height: LINE_THICKNESS,
        }}
      ></div>
    </div>
  );
});

export interface LineComponentProps {
  model: LineModel;
  game: Game;
}
