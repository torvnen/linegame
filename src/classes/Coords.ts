export default interface Coords {
  x: number;
  y: number;
}

export function areCoordsEqual(a: Coords, b: Coords) {
  return a.x === b.x && a.y === b.y;
}
