import { LineDirection, LineCoords } from "./Line";
import Dot from "./Dot";

export const doNTimes = (f: () => any, n: Number): void => {
  for (let i = 0; i < n; i++) f();
};

export function deconstructLineDirection(d: LineDirection) {
  return {
    isLtr: (d & LineDirection.LeftToRight) === LineDirection.LeftToRight,
    isRtl: (d & LineDirection.RightToLeft) === LineDirection.RightToLeft,
    isUtd: (d & LineDirection.UpToDown) === LineDirection.UpToDown,
    isDtu: (d & LineDirection.DownToUp) === LineDirection.DownToUp,
  };
}
export function getLineCoords(d: Dot, l: LineDirection): LineCoords {
  const { isDtu, isUtd, isRtl, isLtr } = deconstructLineDirection(l);
  const c: LineCoords = {};
  if (isLtr || isRtl) {
    // It's a horizontal or diagonal line
    c.startX = isLtr ? d.startX(true) : d.endX(true);
    c.endX = isLtr ? d.endX(true) : d.startX(true);
    if (isUtd) {
      c.startY = d.startY(true);
      c.endY = d.endY(true);
    } else if (isDtu) {
      c.startY = d.endY(true);
      c.endY = d.startY(true);
    } else {
      c.startY = (d.startY() + d.endY()) / 2;
      c.endY = (d.startY() + d.endY()) / 2;
    }
  } else {
    // It's a vertical line
    c.startX = (d.startX(true) + d.endX(true)) / 2;
    c.endX = c.startX;
    c.startY = isUtd ? d.startY(true) : d.endY(true);
    c.endY = isDtu ? d.endY(true) : d.startY(true);
  }
  return c;
}
export function getDotsBetween(
  boardState: Array<Array<Dot>>,
  d1: Dot,
  d2: Dot
): Array<Dot> | null {
  const hDirection: LineDirection =
    d1.xIndex === d2.xIndex
      ? LineDirection.None
      : d1.xIndex < d2.xIndex
      ? LineDirection.LeftToRight
      : LineDirection.RightToLeft;
  const vDirection: LineDirection =
    d1.yIndex === d2.yIndex
      ? LineDirection.None
      : d1.yIndex < d2.yIndex
      ? LineDirection.UpToDown
      : LineDirection.DownToUp;
  const dots = Array<Dot>();
  while (true) {
    const nextX =
      hDirection === LineDirection.None
        ? d1.xIndex
        : hDirection === LineDirection.LeftToRight
        ? d1.xIndex + 1
        : d1.xIndex - 1;
    const nextY =
      vDirection === LineDirection.None
        ? d1.yIndex
        : vDirection === LineDirection.UpToDown
        ? d1.yIndex + 1
        : d1.yIndex - 1;
    // Check if we went further than d2
    // * that would mean that a line from d1 to d2 is not legitimate
    const xTooFar =
      Math.abs(d1.xIndex - d2.xIndex) < Math.abs(d1.xIndex - nextX);
    const yTooFar =
      Math.abs(d1.yIndex - d2.yIndex) < Math.abs(d1.yIndex - nextY);
    if (xTooFar || yTooFar) {
      return null;
    }
    dots.push(boardState[nextX][nextY]);
    if (d2.xIndex === nextX && d2.yIndex === nextY) break;
  }
  return dots;
}
