import Coords from "./Coords";

export enum Direction {
  None = 0,
  Right = 1 << 0,
  Left = 1 << 1,
  Down = 1 << 2,
  Up = 1 << 3,
}

export function dissectDirection(d: Direction) {
  const [isRight, isLeft, isDown, isUp] = [
    (d & Direction.Right) === Direction.Right,
    (d & Direction.Left) === Direction.Left,
    (d & Direction.Down) === Direction.Down,
    (d & Direction.Up) === Direction.Up,
  ];
  return {
    isRight,
    isLeft,
    isDown,
    isUp,
    isDiagonal: (isUp || isDown) && (isRight || isLeft),
    isHorizontal: (isRight || isLeft) && !(isUp || isDown),
    isVertical: (isUp || isDown) && !(isRight || isLeft),
  };
}

export function directionToString(d: Direction) {
  const dir = dissectDirection(d);
  return (
    (dir.isUp ? "up" : "") +
    (dir.isDown ? "down" : "") +
    (dir.isRight ? "right" : "") +
    (dir.isLeft ? "left" : "")
  );
}

export function coordsToString(c: Coords | Coords[]): String {
  const coordToString = (c: Coords) => {
    return `(${c.x}, ${c.y})`;
  };
  return Array.isArray(c)
    ? `[${c.map(coordToString).join(", ")}]`
    : coordToString(c);
}

export function allDirections(): Direction[] {
  return [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right,
    Direction.Up | Direction.Left,
    Direction.Up | Direction.Right,
    Direction.Down | Direction.Left,
    Direction.Down | Direction.Right,
  ];
}
