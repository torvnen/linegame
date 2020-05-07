import { LineDirection } from "./Line";

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
