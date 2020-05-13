import {
  Direction,
  dissectDirection,
  coordsToString,
  directionToString,
} from "./Direction";
import Coords from "./Coords";
import { BOARD_MATRIX_SIZE } from "./constants";
import log from "./Log";

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
    const {
      isLeft: isRtl,
      isRight: isLtr,
      isDown: isUtd,
      isUp: isDtu,
    } = dissectDirection(d);
    x = isLtr
      ? x + 1 === 0
        ? 1
        : x + 1
      : isRtl
      ? x - 1 === 0
        ? -1
        : x - 1
      : x;
    y = isUtd
      ? y + 1 === 0
        ? 1
        : y + 1
      : isDtu
      ? y - 1 === 0
        ? -1
        : y - 1
      : y;
  });
  return coords;
})();

export function getDirectionForCoords(c1: Coords, c2: Coords) {
  let d = Direction.None;
  if (c1.x < c2.x) d |= Direction.Right;
  else if (c1.x > c2.x) d |= Direction.Left;
  if (c1.y < c2.y) d |= Direction.Up;
  else if (c1.y > c2.y) d |= Direction.Down;
  return d;
}

export function directionsOverlap(d1: Direction, d2: Direction): boolean {
  if (d1 === d2) return true;
  const [dir1, dir2] = [dissectDirection(d1), dissectDirection(d2)];
  // Vertical line
  return dir1.isVertical && dir2.isVertical // Vertical: "|"
    ? true
    : dir1.isHorizontal && dir2.isHorizontal // Horizontal: "-"
    ? true
    : dir1.isRight && dir1.isUp && dir2.isLeft && dir2.isDown // Diagonal 1: "/"
    ? true
    : dir2.isRight && dir2.isUp && dir1.isLeft && dir1.isDown // Diagonal 1 with reversed comparison
    ? true
    : dir1.isLeft && dir1.isUp && dir2.isRight && dir2.isDown // Diagonal 2: "\"
    ? true
    : dir2.isLeft && dir2.isUp && dir1.isRight && dir1.isDown // Diagonal 2 with reversed comparison
    ? true
    : false;
}

export function getClassNamesForLineDirections(
  directions: Direction[]
): String {
  if (!Array.isArray(directions) || directions.length === 0) return "";
  const a = Array<String>();
  log.group("getClassNamesForLineDirections");
  for (const direction of directions) {
    const d = dissectDirection(direction);
    log.d(
      "Direction %s (%s): %s",
      direction,
      directionToString(direction),
      JSON.stringify(d)
    );
    if ((d.isUp && d.isRight) || (d.isDown && d.isLeft))
      a.push("line-right-up");
    if ((d.isDown && d.isRight) || (d.isUp && d.isLeft))
      a.push("line-right-down");
    if ((d.isUp || d.isDown) && !d.isRight && !d.isLeft)
      a.push("line-vertical");
    if ((d.isRight || d.isLeft) && !d.isUp && !d.isDown)
      a.push("line-horizontal");
  }
  const s = a.join(" ");
  log.v(
    `Directions [${directions
      .map(directionToString)
      .join(", ")}] resulted in className=%s`,
    s
  );
  log.groupEnd();

  return s;
}

export function getNextCoords(coords: Coords, direction: Direction): Coords {
  const d = dissectDirection(direction);
  let { x, y } = coords;
  if (d.isUp) y = sumUntilNotZero(y, 1);
  if (d.isDown) y = sumUntilNotZero(y, -1);
  if (d.isRight) x = sumUntilNotZero(x, 1);
  if (d.isLeft) x = sumUntilNotZero(x, -1);
  // log.d(
  //   "Next coords from %s in direction %s is at %s",
  //   coordsToString(coords),
  //   directionToString(direction),
  //   coordsToString({ x, y })
  // );
  return { x, y };
}

export function sumUntilNotZero(a: number, sumToAdd: number): number {
  return a + sumToAdd === 0
    ? sumUntilNotZero(a + sumToAdd, sumToAdd)
    : a + sumToAdd;
}

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
