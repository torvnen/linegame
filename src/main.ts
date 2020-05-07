import Line from "./Line";
import Dot from "./Dot";
import Game from "./Game";

const game = new Game(document.querySelector("main"));

game.createBoard().then(() => {
  let startDot: Dot | undefined;
  let endDot: Dot | undefined;
  let isDragging = false;
  let line: Line | undefined;
  const getRelativeCoords = (e: MouseEvent): { x: number; y: number } => {
    const bounds = (e.target as HTMLElement).getBoundingClientRect();
    const [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
    return { x, y };
  };
  game.canvas.onmousemove = function (e: MouseEvent) {
    const { x, y } = getRelativeCoords(e);
    const nextDot = game.getDotAt(x, y);

    if (!!startDot && !startDot.equals(nextDot) && !startDot.isLocked)
      game.toggleDotActivated(startDot.xIndex, startDot.yIndex, false);
    if (!!nextDot && game.isDotActivateable(nextDot)) {
      game.toggleDotActivated(nextDot.xIndex, nextDot.yIndex, true);
    }
    if (!line) startDot = nextDot;
    else endDot = nextDot;
  };
  game.canvas.onmousedown = function (e: MouseEvent) {
    if (!!startDot) {
      startDot.lock();
      line = new Line(startDot);
    }
  };
  game.canvas.onmouseup = function (e: MouseEvent) {
    if (!!startDot) {
    }
    game.completeOrDestroyLine(line);
    line = undefined;
  };
});