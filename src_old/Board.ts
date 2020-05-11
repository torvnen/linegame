import Dot, { DotState } from "./Dot";
import Game from "./Game";

export default class Board {
  state = Array<Array<Dot>>();
  private _previousHovered: Dot | undefined;
  private _previousStartOfLine: Dot | undefined;
  private _endOfLine: Dot | undefined;
  get hovered(): Dot | undefined {
    return this._previousHovered;
  }
  set hovered(dot: Dot) {
    if (!!dot && !dot.equals(this._previousHovered)) {
      if (!!this._previousHovered)
        this._previousHovered.requestState(DotState.Closed);
      dot.requestState(DotState.Opened);
      this._previousHovered = dot;
      if (!!this._previousStartOfLine) {
        this.endOfLine = dot;
      }
    }
  }
  set endOfLine(dot: Dot) {
    this._endOfLine = dot;
  }
  set startOfLine(dot: Dot) {
    if (!!dot && !dot.equals(this._previousStartOfLine)) {
      if (!!this._previousStartOfLine)
        this._previousStartOfLine.requestState(DotState.Closed);
      dot.requestState(DotState.StartOfIncomingLine);
    }
    this._previousStartOfLine = dot;
  }
  addToBoard(dot: Dot) {
    if (!Array.isArray(this.state[dot.xIndex]))
      this.state[dot.xIndex] = Array<Dot>();
    this.state[dot.xIndex][dot.yIndex] = dot;
  }

  async create() {
    // Amount of padding:
    const padding = Math.floor((Game.dotsPerSide - 10) / 2);
    let [xIndex, yIndex] = [padding + 3, padding];

    const drawWithDelay = async (
      xIndex: number,
      yIndex: number,
      isInitial: boolean = false,
      delayMs: number = 3
    ) => {
      this.addToBoard(
        new Dot(xIndex, yIndex, isInitial).requestState(
          isInitial ? DotState.Opened : DotState.Closed
        )
      );
      await new Promise((r: any) => setTimeout(r, delayMs));
    };

    const draw3InitialDots = async (
      direction: "up" | "down" | "right" | "left"
    ) => {
      for (let i = 0; i < 3; i++) {
        switch (direction) {
          case "up":
            yIndex--;
            break;
          case "down":
            yIndex++;
            break;
          case "right":
            xIndex++;
            break;
          case "left":
            xIndex--;
            break;
        }
        await drawWithDelay(xIndex, yIndex, true, 12);
      }
      return new Promise((r: any) => r());
    };
    // Draw 3 dots in multiple directions to create a hollow cross
    // Use async/await in order to use animation
    await draw3InitialDots("right");
    await draw3InitialDots("down");
    await draw3InitialDots("right");
    await draw3InitialDots("down");
    await draw3InitialDots("left");
    await draw3InitialDots("down");
    await draw3InitialDots("left");
    await draw3InitialDots("up");
    await draw3InitialDots("left");
    await draw3InitialDots("up");
    await draw3InitialDots("right");
    await draw3InitialDots("up");

    const coordsWithOpenedDots = this.flatten()
      .filter((d) => d.state === DotState.Opened)
      .map((dot) => [dot.xIndex, dot.yIndex]);

    for (let y = 0; y < Game.dotsPerSide; y++) {
      for (let x = 0; x < Game.dotsPerSide; x++) {
        if (coordsWithOpenedDots.some((c) => c[0] === x && c[1] === y))
          continue;
        else await drawWithDelay(x, y);
      }
    }

    return Promise.resolve();
  }

  flatten(): Array<Dot> {
    const flat = Array<Dot>();
    this.state.forEach((dArr) => dArr.forEach((d) => flat.push(d)));
    return flat;
  }
}
