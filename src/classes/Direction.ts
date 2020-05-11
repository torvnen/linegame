export enum Direction {
  Right = 1 << 0,
  Left = 1 << 1,
  Down = 1 << 2,
  Up = 1 << 3,
}

export function dissectDirection(d: Direction) {
  return {
    isLtr: (d & Direction.Right) === Direction.Right,
    isRtl: (d & Direction.Left) === Direction.Left,
    isUtd: (d & Direction.Down) === Direction.Down,
    isDtu: (d & Direction.Up) === Direction.Up,
  };
}
