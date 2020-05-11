import { Direction, dissectDirection } from "./Direction";
import Coords from "./Coords";
import { BOARD_MATRIX_SIZE } from "./constants";

export const initialCellCoords: Array<Coords> = (() => {
  const coords = Array<Coords>();
  const directions: Array<Direction> = Array().concat(
    Array(3).fill(Direction.Right),
    Array(3).fill(Direction.Down),
    Array(3).fill(Direction.Right),
    Array(3).fill(Direction.Down),
    Array(3).fill(Direction.Left),
    Array(3).fill(Direction.Down),
    Array(3).fill(Direction.Left),
    Array(3).fill(Direction.Up),
    Array(3).fill(Direction.Left),
    Array(3).fill(Direction.Up),
    Array(3).fill(Direction.Right),
    Array(3).fill(Direction.Up)
  );
  let x = -2;
  let y = -5;
  directions.forEach((d) => {
    coords.push({ x, y });
    const { isRtl, isLtr, isUtd, isDtu } = dissectDirection(d);
    x = isLtr ? (x + 1 === 0 ? 1 : x + 1) : isRtl ? (x - 1 === 0 ? -1 : x - 1) : x;
    y = isUtd ? (y + 1 === 0 ? 1 : y + 1) : isDtu ? (y - 1 === 0 ? -1 : y - 1) : y;
  });
  return coords;
})();

export const initialGameGrid = ((): Array<Coords> => {
  const grid = [...initialCellCoords];
  const padding = (BOARD_MATRIX_SIZE - 10) / 2;
  const xs = grid.map(({ x, y }) => x);
  const ys = grid.map(({ x, y }) => y);
  const [startX, endX, startY, endY] = [
    Math.min(...xs) - padding,
    Math.max(...xs) + padding,
    Math.min(...ys) - padding,
    Math.max(...ys) + padding,
  ];
  console.debug(
    "Creating a matrix from [%o, %o] to [%o, %o]",
    startX,
    startY,
    endX,
    endY
  );
  for (let i = startX; i < endX; i++)
    for (let j = startY; j < endY; j++)
      if (!grid.some(({ x, y }) => x === i && y === j))
        grid.push({ x: i, y: j });
  return grid;
})();
