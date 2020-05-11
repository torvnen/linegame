export enum Direction {
  None = 0,
  Right = 1 << 0,
  Left = 1 << 1,
  Down = 1 << 2,
  Up = 1 << 3,
}

export function dissectDirection(d: Direction) {
  return {
    isRight: (d & Direction.Right) === Direction.Right,
    isLeft: (d & Direction.Left) === Direction.Left,
    isDown: (d & Direction.Down) === Direction.Down,
    isUp: (d & Direction.Up) === Direction.Up,
  };
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
