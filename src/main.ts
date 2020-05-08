import Line from "./Line";
import Dot, { DotState } from "./Dot";
import Game from "./Game";

const game = new Game(document.querySelector("main"));

game.start().then(() => {
  let hoveredDot: Dot | null
  let startDot: Dot | null;
  let endDot: Dot | null;
  const getRelativeCoords = (e: MouseEvent): { x: number; y: number } => {
    const bounds = (e.target as HTMLElement).getBoundingClientRect();
    const [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
    return { x, y };
  };
  game.canvas.onmousemove = function (e: MouseEvent) {
    const { x, y } = getRelativeCoords(e);
    const nextDot = game.getDotAtOrNull(x, y);
    if (!startDot) {
      // Not drawing a line. Clear the previous hovered dot.
      if (!!hoveredDot) hoveredDot.requestState(DotState.Closed)
    }

    if (!!startDot && !startDot.equals(hoveredDot)) {
      // Hovered dot has changed. Update endDot.
      endDot = nextDot;
    } else {
      // Hovered dot 
      startDot = nextDot;
    }
  };
  game.canvas.onmousedown = function (e: MouseEvent) {
    // On mouse down: set current hovered dot (if any)
    // * as state=StartOfIncomingLine.
    if (!!startDot) startDot.requestState(DotState.StartOfIncomingLine);
  };
  game.canvas.onmouseup = function (e: MouseEvent) {
    if (!!startDot) {
    }
  };
});
