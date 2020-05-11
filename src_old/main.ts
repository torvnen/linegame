import Line from "./Line";
import Dot, { DotState } from "./Dot";
import Game from "./Game";

const game = new Game(document.querySelector("main"));

game.start().then(() => {
  const getRelativeCoords = (e: MouseEvent): { x: number; y: number } => {
    const bounds = (e.target as HTMLElement).getBoundingClientRect();
    const [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
    return { x, y };
  };
  game.canvas.onmousemove = function (e: MouseEvent) {
    const { x, y } = getRelativeCoords(e);
    const nextDot = game.getDotAtOrNull(x, y);
    game.board.hovered = nextDot;
  };
  game.canvas.onmousedown = function (e: MouseEvent) {
    // On mouse down: set current hovered dot (if any)
    // * as state=StartOfIncomingLine.
    game.board.startOfLine = game.board.hovered
  };
  game.canvas.onmouseup = function (e: MouseEvent) {
    game.board.startOfLine = undefined
  };
});
